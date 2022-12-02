const promodel=require('../model/product')
function addproduct(req,res){
    let data=req.body
    let ins=new promodel(data);
ins.save((err)=>{
    if(err) throw err;
    else res.send("Data Saved");
})

}
const showproduct= async(req,res)=>{
        let id=req.params.id;
        let data=await promodel.findOne({_id:id})
       return res.render("update",{data:data})

}
function getallproduct(req,res){
       promodel.find({},(err,data)=>{
        if(err){
            res.send("something went wrong")
        }
        else{
            res.render("productdetail",{title:'Hello india',contents:data});
        }
       })
}
function deleteProduct(req,res){
    let pid=req.params.id;
    promodel.remove({_id:pid},(err)=>{
       if(err){ res.send("Something wrong")}
       else {
           res.status(200).send("Product Deleted");
       }
    })
}
function updateProduct(req,res){
   let pid=req.params.id;
   let formData=req.body;
   console.log(pid)
   console.log(formData)
   promodel.updateOne({_id:pid},{$set:formData},(err)=>{
       if(err){ console.log("Error")}
       else {
           res.send("Product Updated")
       }
   })
}
module.exports={
    addproduct,getallproduct,deleteProduct,updateProduct,showproduct
}