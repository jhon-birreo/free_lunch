import mongoose from "mongoose";
export interface IngredientInterface extends mongoose.Document {
  name: string;
  quantity: number;
}
export interface responseGlobal extends mongoose.Document {
  success: boolean;
  data: {} | [];
}
