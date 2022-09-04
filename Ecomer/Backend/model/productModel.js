const mongoose=require('mongoose');

const  productSchrema=mongoose.Schema({
    name:{
        type:String,
        required: [true,"pls Enter product name"],
        trim:true
    },
    description:{
        type:String,
        required: [true,"pls Enter product description"]
    },
    price:{
        type:Number,
        required: [true ,"pls Enter product Price"],
        maxLength:[8,"price cannot exceed 8 digits"]
    },
    rating:{
        type:Number,
        default:0,
    },
    images:[{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            require:true
        }
    }
        
    ],
    category:{
          type:String,
          required:[true,"pls enter the product category"]
    },
    stock:{
        type:Number,
        required:[true,"pls enter product Stock"],
        maxLength:[4,"Stock cannot exceed 4 digits"],
        default:1,
        
    },
    numOfReviews:{
        type:Number,
        default:0,
        
    },
    reviews:[{
       name:{
          type:String,
          required:true,
       },
       rating:{
             type:Number,
             required:true,
       },
       comment:{
        type:String,
        required:true

       }
    }],
    createdate:{
        type:Date,
        default:Date.new
    }
});
module.exports=mongoose.model("Product",productSchrema);