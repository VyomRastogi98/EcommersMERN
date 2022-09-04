const ErrorHander=require("../utils/errorhandler");


module.exports=(err,req,res,next)=>{
    err.statusCode= err.statusCode || 500;
    err.message=err.message ||"Internal Server Error"

    //Wrong Mongodb id error
    if(err.name==="castError"){
        const message=`Resource not found. invalid :${err.path}`;
        err=new ErrorHander(message,400);
    }
    
    res.status(err.statusCode).json({
        success:false,  
        message: err.message
    });
}