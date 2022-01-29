import mongoose, { Schema, model } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { ShoppingInterface } from "../infrastructure/interface/shippong.interface";

const shoppingSchema = new Schema(
  {
    ingredients: {
      type: Schema.Types.ObjectId,
      ref: 'ingredients',
      trim: true,
      required: [true, "el ingrediente es obligatorio"],
    },
    quantity: {
      type: Number,
      trim: true,
      required: [true, "la cantidad es obligatorio"],
    },
  },
  // "dishes":"pollo a la braza",    
  // "ingredients":"61f323f21a6d0c28d2a6a4a5",    
  // "quantity":4
  {
    toJSON: {
      virtuals: true,
    },
    toObject: {
      virtuals: true,
    },
    timestamps: true,
  }
);
// shoppingSchema.index({
//   ingredients: 1,
// });
shoppingSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  //const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});
shoppingSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
export default model<ShoppingInterface>("shoppings", shoppingSchema);
