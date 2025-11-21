import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './config/db.js';
dotenv.config();
const app=express();
const PORT=process.env.PORT||5000;

//middleware
app.use(cors());
app.use(express.json());
connectDB();

app.get('api/test',(req,res)=>{
    res.json({message:"server and db is connected"});
});
app.listen(PORT,()=>console.log(`server is running on port ${PORT}`));