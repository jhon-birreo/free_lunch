import mongoose from "mongoose";
export interface ShoppingInterface extends mongoose.Document {
  ingredients: string;
  quantity: number;
}
export interface responseGlobal extends mongoose.Document {
  success: boolean;
  data: {} | [];
}
