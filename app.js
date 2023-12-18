const express = require("express");
const app = express();
const port = 4000;
const bodyParser= require('body-parser')
 var urlencodedParser = bodyParser.urlencoded({ extended: false });
const fpdf = require('node-fpdf')
app.set("views", "./views");
app.set("view engine", "ejs");
app.use("/Public", express.static("Public"));

app.get('/', (req,res)=>{
    res.render('index')
})
app.post('/' ,urlencodedParser, (req,res)=>{
    let text = req.body.text_field //text est le name de l'input
    console.log(text)
    let outputfile = Date.now()  + "test.pdf"
    let pdf = new fpdf('P',"mm","A4")
    pdf.AddPage()
    pdf.SetFont("Arial" ,"B",15); //definir la police
    pdf.MultiCell(0,10,text) // recevoir le text dans text
    pdf.Output('F', outputfile)
     sleep(1000) // await spleep(1000)
    res.download(outputfile,()=>{
        //  fs.unlinkSync(outputfile)
    })
})
function sleep(ms){
    return new Promise((resolve)=>{
        setTimeout(resolve,ms);
    })
}

app.listen(port , ()=>{
    console.log('port 4000')
})