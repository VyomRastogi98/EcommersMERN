const mongoose=require("mongoose");

    mongoose.connect("mongodb://localhost:27017/Ecomerce",{
       
    }).then((data)=>{
        console.log(`mongo connected`)
    });
