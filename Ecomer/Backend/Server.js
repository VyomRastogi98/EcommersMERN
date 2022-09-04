const app=require("./App");
require("../Backend/Config/Db/database")
const dotenv=require('dotenv');

//Handling uncaught Exception
process.on('uncaughtException',(err)=>{
  console.log(`Error: ${err.message}`)
  console.log(`Shutting down the server due to Handling uncaught Exception`);
  process.exit(1);


})


dotenv.config({path: 'Backend/Config/config.env'}); //config


const Server= app.listen(process.env.PORT,()=>{
  console.log(`Server is running on http://localhost:${process.env.PORT}`)
})


//unhandle promise rejections
process.on('unhandledRejection',(err)=>{
  console.log(`Error:${err.message}`);
  console.log(`Shutting down the server due to hanandle promise rejection`);

Server.close(()=>{
  process.exit(1);
})

})
