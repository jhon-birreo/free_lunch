import mongoose, { Schema, model } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { IngredientInterface } from "../infrastructure/interface/ingredient.interface";

const IngredientSchema = new Schema(
  {
    name: {
      type: String,
      trim: true,
      unique: true,
      required: [true,'el nombre es obligatorio']
    },
    quantity:{
      type: Number,
      trim: true,
      required: [true,'la cantidad es obligatorio']
    }
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
IngredientSchema.index({
  ingredientId: 1,
});
IngredientSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  //const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});
IngredientSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
export default model<IngredientInterface>("ingredients", IngredientSchema);
