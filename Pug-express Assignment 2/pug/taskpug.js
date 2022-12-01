const express=require('express');
const PORT=8888;
const app=express();
app.set('view engine','pug');
app.set('views','./view');
const path = require('path')
const fs=require('fs');
const zip = require('express-zip');
const folderPath = __dirname+'/user';
app.use('/static', express.static(path.join(__dirname, 'public')))
app.use(express.json());
app.use(express.urlencoded({extended:false}));
app.get("/",(req,res)=>{
   res.render("taskpug");
})
app.get("/about",(req,res)=>{
    res.render("about");
 })
 app.get("/gallery",(req,res)=>{
    res.render("gallery");
 })
 app.get("/services",(req,res)=>{
    res.render("services");
 })
 app.get("/contact",(req,res)=>{
    res.render("contact");
 })
 app.post("/contactdata",(req,res)=>{
    // res.send("file is created");
    let name=req.body.name;
    let phone=req.body.phone;
    var email=req.body.email;
    let age=req.body.age;
    let city=req.body.city;
    let data=name+","+phone+","+email+","+age+","+city+"\n";
    if(fs.existsSync(`./user`)){
        fs.appendFileSync(`./user/detail.txt`,data)//donot take data in string and $ string because JSON.parse throw error when read the file(error-Unexpected token A in JSON at position 8) 
    }
    else{
        fs.mkdirSync(`./user`);
        fs.writeFileSync(`./user/detail.txt`,data);//donot take data in string and $ string because JSON.parse throw error when read the file(error-Unexpected token A in JSON at position 8) 
    }
    res.redirect(`/contactfile/`)// it is used for redirect to page 
 })
 app.get(`/contactfile`,(req,res)=>{
try {
    // read contents of the file
    const data = fs.readFileSync('./user/detail.txt', 'UTF-8')
  
    // split the contents by new line
    const lines = data.split(/\r?\n/)
  var arr=[]
    // print all lines
    
    lines.forEach(line => {
        const li=line.split(/,/)// it is split the 
        arr.push(`{"name":"${li[0]}","phone":"${li[1]}","email":"${li[2]}","age":"${li[3]}","city":"${li[4]}"}`);
    })  
   const result = arr.map(info => JSON.parse(info));
   console.log(arr);
    res.render("contactdetails",{result:result})
  } catch (err) {
    console.error(err)
  }
 })
app.get(`/single`,(req,res)=>{
    res.download(folderPath+'/detail.txt', function(err) {
        if(err) {
            res.send("Error");
        }
        else{
            res.send("Downloaded")
        }
    })
})
app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`Server work on ${PORT}`)
})