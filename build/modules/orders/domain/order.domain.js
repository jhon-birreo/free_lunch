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
const orderSchema = new mongoose_1.Schema({
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
}, {
    toJSON: {
        virtuals: true,
    },
    toObject: {
        virtuals: true,
    },
    timestamps: true,
});
// orderSchema.index({
//   ingredients: 1,
// });
orderSchema.method("toJSON", function () {
    const _a = this.toObject(), { __v, _id } = _a, object = __rest(_a, ["__v", "_id"]);
    //const { __v, _id, password, ...object } = this.toObject();
    object.id = _id;
    return object;
});
orderSchema.plugin(uniqueValidator, { message: "{PATH} debe ser único" });
exports.default = (0, mongoose_1.model)("orders", orderSchema);
