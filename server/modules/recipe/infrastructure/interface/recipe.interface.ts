import mongoose from "mongoose";
export interface RecipeInterface extends mongoose.Document {
  dishes: [];
  ingredients: [];
  quantity: number;
}
export interface responseGlobal extends mongoose.Document {
  success: boolean;
  data: {} | [];
}
