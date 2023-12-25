import dotenv from "dotenv"
import connectDB from "./db/index.js";
import express from "express";


const app = express();

dotenv.config({
    path:"./env"
})

connectDB()
.then(()=>{
    app.listen(process.env.PORT || 8000,()=>{
        console.log(`server is running on port:${process.env.PORT}`);
    })
})
.catch((err)=>{
    console.log("Mongo db connection failed", err);
})
