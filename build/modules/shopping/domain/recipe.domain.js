"use strict";
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const uniqueValidator = require("mongoose-unique-validator");
const recipeSchema = new mongoose_1.Schema({
    dishes: {
        type: String,
        trim: true,
        required: [true, "el plato es obligatorio"],
    },
    ingredients: {
        type: mongoose_1.Schema.Types.ObjectId,
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
});
// recipeSchema.index({
//   ingredients: 1,
// });
recipeSchema.method("toJSON", function () {
    const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
    //const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});
recipeSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
exports.default = (0, mongoose_1.model)("recipes", recipeSchema);
