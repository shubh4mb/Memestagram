import express from 'express';
import mongoose from 'mongoose'
import dotenv from 'dotenv';
import userRoute from '../routes/User.route.js'
import authRoute from '../routes/auth.route.js'
dotenv.config();


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


app.use('/api/user', userRoute)
app.use('/api/auth', authRoute)
app.listen(3007, ()=>{
    console.log(`SERVER RUNNING 3007!!`);
    
})


