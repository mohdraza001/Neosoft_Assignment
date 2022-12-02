const mongoose=require('mongoose');
const proschema=new mongoose.Schema({
    pname:{
        type:String,
        unique:true,
        require:true
    },
    price:{
        type:Number,
        require:true
    },
    
    quantity:{
          type:Number,required:true
    },
    description:{
        type:String,required:true
    },
    image:{
    type:String,
     required:true
    },
    
    created_at:{
        type:Date,
        default:Date.now
    }
});
module.exports=mongoose.model("product",proschema)