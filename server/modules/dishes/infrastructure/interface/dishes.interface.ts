import mongoose from "mongoose";
export interface DishesInterface extends mongoose.Document {
  ingredients: [];
  name: string;
}
export interface responseGlobal extends mongoose.Document {
  success: boolean;
  data: {} | [];
}
