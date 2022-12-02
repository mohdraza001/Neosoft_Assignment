const express=require('express');
const {addproduct,getallproduct,deleteProduct,updateProduct,showproduct} =require('./controller/productcontroller')
const router=express.Router();
router.get("/",(req,res)=>{
    res.render("index");
})
router.get("/product",(req,res)=>{
    res.render("addproduct")
})
// router.get("/update/:id",(req,res)=>{
//     let pid=req.params.id;
//     res.render("update",{pid});
// })
router.post("/addproduct",addproduct);
router.get("/getproduct",getallproduct);
router.get("/deleteproduct/:id",deleteProduct);
router.get("/update/:id",showproduct)
router.post("/editproduct/:id",updateProduct)
module.exports=router;