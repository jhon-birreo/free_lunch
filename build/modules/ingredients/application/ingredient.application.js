"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IngredientApplication = void 0;
const ingredient_domain_1 = __importDefault(require("../domain/ingredient.domain"));
class IngredientApplication {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield ingredient_domain_1.default.find({});
                return { success: true, data: find };
            }
            catch (error) {
                return { success: false, data: [] };
            }
        });
    }
    create(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newInsert = yield new ingredient_domain_1.default({
                    name: value.name,
                    quantity: value.quantity,
                }).save();
                return { success: true, data: newInsert };
            }
            catch (error) {
                console.log("Hable con el administrador: ", error);
                return { success: false, data: [] };
            }
        });
    }
    update(value) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(value);
            try {
                const name = value.name;
                // const find = await IngredientDomain.findOne({ name }).select({ quantity: 1 }).exec();
                const quantity = value.quantity;
                const update = yield ingredient_domain_1.default.findOneAndUpdate({ name }, { $set: { quantity } }, { new: true });
                return { success: true, data: update };
            }
            catch (error) {
                console.log("Hable con el administrador: ", error);
                return { success: false, data: [] };
            }
        });
    }
    findOne(name) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const find = yield ingredient_domain_1.default.findOne({ name }).exec();
                // const find = await IngredientDomain.findOne({ name }).select({ quantity: 1 }).exec();
                return { success: true, data: find };
            }
            catch (error) {
                return { success: false, data: [] };
            }
        });
    }
}
exports.IngredientApplication = IngredientApplication;
