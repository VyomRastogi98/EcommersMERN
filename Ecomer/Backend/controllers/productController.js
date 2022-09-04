const Product = require("../model/productModel");
const ErrorHander = require("../utils/errorhandler");
const catchAsynError=require("../middleware/catchAsynError");
const ApiFeatures = require("../utils/apifeatures");




// Create product --admin
exports.createProduct = catchAsynError(
    async (req, res, next) => {
        const product = await Product.create(req.body);
        res.status(201).json({
            success: true,
            product
        })
    }
);




//GET ALLPRODUCT
exports.getAllProduct = catchAsynError(

    async (req, res) => {
        const resultperpage=5;
        // const productCount=await product.countDocuments();

       const apifeatures= new ApiFeatures(Product.find(),req.query).search().filter().pagination(resultperpage)
        const product = await apifeatures.query;
        res.status(200).json({
            success: true,
            product
        })
    }
)

//get product details
exports.getProductDetail=catchAsynError(
    async(req,res,next)=>{

        const product= await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHander("Product not found", 404))
            
        }
        res.status(200).json({
            success: true,
            product,
            // countDocuments
        })
        
    }
)




// update product ---Admin
exports.updateProduct = catchAsynError(
    async (req, res, next) => {

        let product = Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHander("Product not found", 404));
        }
        product = await Product.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true,
            useFindAndModify: false
    
        });
        res.status(200).json({
    
            success: true,
            product
        })
    }
)

//Delete product
exports.deleteProduct=catchAsynError(
    async(req,res,next)=>{

        const product=  await Product.findById(req.params.id);
        if (!product) {
            return next(new ErrorHander("Product not found", 404));
        }
        await product.remove();
        res.status(200).json({
            success: true,
            message: "product deleted SUccessfully"
            
        })
    }
    
)