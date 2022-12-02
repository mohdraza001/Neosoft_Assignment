const express=require('express');
const mongoose=require('mongoose');
const PORT=9999;
const app=express();
const path=require('path');
const ejs=require('ejs');
app.use(express.json())
app.use(express.urlencoded({extended:false}));
app.set('view engine','ejs');
app.set('views','view');
app.use('/static', express.static(path.join(__dirname, 'public')))
mongoose.connect('mongodb://localhost:27017/mycrudejs',{
     useNewUrlParser:true,
     useUnifiedTopology:true
})
const db=mongoose.connection;
db.on('error',(err)=>{throw err});
db.once('open',()=>{console.log("Database created");
})
const calla=require('./index');
app.use("/",calla)
// app.get("*",(req,res)=>{
//     res.render("404");
// })

app.listen(PORT,(err)=>{
    if(err) console.log(err)
    else console.log(`work on ${PORT}`)
})