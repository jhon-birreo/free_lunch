import mongoose from "mongoose";
export interface OrderInterface extends mongoose.Document {
  dishes: string;
  n_order: number;
}
export interface responseGlobal extends mongoose.Document {
  success: boolean;
  data:  [];
}
