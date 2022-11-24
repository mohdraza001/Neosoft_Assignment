const express=require('express');
const PORT=8888;
const app=express();
app.set('view engine','pug');
app.set('views','./view');
const path = require('path')
const fs=require('fs');
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
    let data=(`<tr>
    <td>${name}</td>
    <td>${phone}</td>
    <td>${email}</td>
    <td>${age}</td>
    <td>${city}</td></tr>
    `);
    var wq=data.toString();
    if(fs.existsSync(`./user`)){
        fs.appendFileSync(`./user/detail.pug`,`${wq}`)
    }
    else{
        fs.mkdirSync(`./user`);
        fs.writeFileSync(`./user/detail.pug`,`${wq}`);
        
    }
    res.redirect(`/contactfile/`)
 })
 app.get(`/contactfile`,(req,res)=>{
 
    if(fs.existsSync(`./user/detail.pug`)){
    //let data=fs.readFileSync(`./user/detail.pug`)
    res.render('contactdetails')
}
else{
    res.render("404");
}
 })
app.listen(PORT,(err)=>{
    if(err) throw err;
    else console.log(`Server work on ${PORT}`)
})