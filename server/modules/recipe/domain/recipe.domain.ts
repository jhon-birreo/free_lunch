import mongoose, { Schema, model } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { RecipeInterface } from "../infrastructure/interface/recipe.interface";

const recipeSchema = new Schema(
  {
    dishes: {
      type: String,
      trim: true,
      required: [true, "el plato es obligatorio"],
    },
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
// recipeSchema.index({
//   ingredients: 1,
// });
recipeSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  //const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});
recipeSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
export default model<RecipeInterface>("recipes", recipeSchema);
