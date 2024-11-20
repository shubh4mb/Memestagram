import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoute from './routes/User.route.js'
import authRoute from './routes/auth.route.js'
import adminRoute from './routes/admin.route.js'
import cookieParser from 'cookie-parser';
dotenv.config();
import cors from 'cors';



mongoose.connect(process.env.MONGO)
  .then(() => {
    console.log("Connected to MongoDB Atlas");
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
const app=express()
app.use(express.json()); 
app.use(express.urlencoded({ extended: true }));  
app.use(cookieParser());

app.use('/uploads', express.static('uploads'));
app.use(cors({
  origin: 'http://localhost:5137', // Your frontend URL
  credentials: true,               // Allow cookies and other credentials
}));

app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.use('/api/admin',adminRoute)

app.listen(3007, ()=>{
    console.log(`SERVER RUNNING 3007!!`);
    
})


