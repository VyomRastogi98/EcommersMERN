const mongoose=require('mongoose')
const validator=require('validator')
const bycrypt=require("bcryptjs")
const  jwt=require('jsonwebtoken')


const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please Enter your Name "],
        maxLength:[35 ,"Name cannot exceed 30 characters"],
        minLength:[4,"Name should have more than 4 characters"]
        
    },
    email:{
        type:String,
        required:[true,"Please Enter your email "],
        unique:true,
        validate:[validator.isEmail,"please Enter a vaid mail"]
        
    },
    password:{
        type:String,
        required:[true,"Please Enter your password "],
        minLength:[8 ,"password should be greater than 8 characters "],
        select:false,
    },
    avatar:{
        public_id:{
            type:String,
            require:true
        },
        url:{
            type:String,
            require:true
        }
    },
    role:{
        type:String,
        default:"user",
    },
    resetPasswordToken:String,
    resetPasswordExpire:Date
});

userSchema.pre("save",async function(next){

    if(!this.isModified("password")){
        next()
    }
    this.password=await bycrypt.hash(this.password,10);
})

//jwt TOken 
userSchema.methods.getJWTToken=function(){
   return jwt.sign({id:this._id},process.env.JWT_SECRET,{
    expiresIn: process.env.JWT_EXPIRE,
   })
}
// comparePassword

userSchema.methods.comparePassword = async function (password) {
    return await bycrypt.compare(password, this.password);
  };


module.exports=mongoose.model("User",userSchema)