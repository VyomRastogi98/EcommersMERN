const catchAsynError=require("./catchAsynError");


exports.IsAuthenticatedUser=  catchAsynError(async(req,res,next)=>{
    const token=req.cookies;

    console.log(token)
})
