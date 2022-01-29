import mongoose from "mongoose";
import env from "./environment.json";



export function mongooConnect() {
    const clientOption = {
      socketTimeoutMS: 30000,
      useNewUrlParser: true,
      useUnifiedTopology: true,
    };
    mongoose
      .connect(env.MONGODB_URI, clientOption,()=>{
        console.log('connect database mongoose!');
        
      });
  }
  
  
