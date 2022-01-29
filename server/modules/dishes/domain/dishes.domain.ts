import mongoose, { Schema, model } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { DishesInterface } from "../infrastructure/interface/dishes.interface";

const dishesSchema = new Schema(
  {
    ingredients: {
      type: [Schema.Types.ObjectId],
      ref: 'ingredients',
      trim: true,
      required: [true, "el ingrediente es obligatorio"],
    },
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true, "el nombre es obligatorio"],
    },
  },
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
// dishesSchema.index({
//   ingredients: 1,
// });
dishesSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  //const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});
dishesSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
export default model<DishesInterface>("dishes", dishesSchema);
