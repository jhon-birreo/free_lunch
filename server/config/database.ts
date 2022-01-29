import mongoose from "mongoose";
import env from "./environment.json";



export function mongooConnect() {
    const clientOption = {
      socketTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    // mongosh "mongodb+srv://cluster0.qdfg7.mongodb.net/myFirstDatabase" --username chat_user
    mongoose
      .connect(env.MONGODB_URI, clientOption,()=>{
        console.log('connect database mongoose!');
        
      });
  }
  
  
