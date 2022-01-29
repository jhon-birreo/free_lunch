import mongoose, { Schema, model } from "mongoose";
const uniqueValidator = require("mongoose-unique-validator");
import { OrderInterface } from "../infrastructure/interface/order.interface";

const orderSchema = new Schema(
  {
    dishes: {
      type: String,
      ref: 'dishes',
      trim: true,
      required: [true, "el palto es obligatorio"],
    },
    n_order: {
      type: Number,
      trim: true,
      unique: true,
      required: [true, "el num. orden es obligatorio"],
    },
    status: {
      type: String,
      trim: true,
      enum: ['listo', 'entregado'],
      required: [true, "el num. orden es obligatorio"],
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
// orderSchema.index({
//   ingredients: 1,
// });
orderSchema.method("toJSON", function () {
  const { __v, _id, ...object } = this.toObject();
  //const { __v, _id, password, ...object } = this.toObject();
  object.id = _id;
  return object;
});
orderSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
export default model<OrderInterface>("orders", orderSchema);
