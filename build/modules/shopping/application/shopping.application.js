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
exports.ShoppingApplication = void 0;
const shopping_domain_1 = __importDefault(require("../domain/shopping.domain"));
class ShoppingApplication {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('finall');
            try {
                let dishesName = null;
                const shoppingDomain = yield shopping_domain_1.default.find({})
                    .populate({
                    path: "ingredients",
                    // select: "name , quantity",
                })
                    .lean()
                    // .sort({ dishes: "asc", ingredients: "desc" })
                    .exec();
                return { success: true, data: shoppingDomain };
            }
            catch (error) {
                console.log("Hable con el administrador: ", error);
                return { success: false, data: [] };
            }
        });
    }
    create(value) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const newInsert = yield new shopping_domain_1.default(value).save();
                return { success: true, data: newInsert };
            }
            catch (error) {
                console.log("Hable con el administrador: ", error);
                return { success: false, data: [] };
            }
        });
    }
}
exports.ShoppingApplication = ShoppingApplication;
