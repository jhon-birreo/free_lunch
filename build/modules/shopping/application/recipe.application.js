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
exports.RecipeApplication = void 0;
const recipe_domain_1 = __importDefault(require("../domain/recipe.domain"));
class RecipeApplication {
    findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            console.log('finall');
            try {
                let dishesName = null;
                const RecipeByDishesAndIngredientDomain = yield recipe_domain_1.default.find({ 'dishes': 'pollo a la braza' })
                    .populate({
                    path: "ingredients",
                    // select: "name , quantity",
                })
                    .lean()
                    // .sort({ dishes: "asc", ingredients: "desc" })
                    .exec();
                // 'dishes.name':'flutter Mercadopago'
                const maper = RecipeByDishesAndIngredientDomain.map((value) => {
                    //   var dishes = value.dishes;
                    //   console.log(dishes);
                    //   console.log(dishes.name);
                    //   if (dishes.name !== dishesName) {
                    //     // console.log(dishes.name);
                    //     // 'dishes.name':'flutter Mercadopago'
                    //  }
                    console.log(value);
                });
                // console.log(RecipeByDishesAndIngredientDomain);
                return { success: true, data: RecipeByDishesAndIngredientDomain };
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
                const newInsert = yield new recipe_domain_1.default({
                    name: value.quantity,
                    ingredients: value.ingredients,
                    dishes: value.dishes,
                }).save();
                return { success: true, data: newInsert };
            }
            catch (error) {
                console.log("Hable con el administrador: ", error);
                return { success: false, data: [] };
            }
        });
    }
    // async update(id:string,value:columnInterface):Promise<Responses<columnInterface>>{
    //   return await this.item.update(id, value);
    // }
    // async delete(id:string):Promise<Responses<columnInterface>>{
    //   return await this.item.delete(id);
    // }
    // async validateBeforeUpdatingById(id:string,value:{}):Promise<Responses<columnInterface>>{
    //   return await this.item.validateBeforeUpdating(id, value);
    // }
    // async changeEnable(id:string):Promise<Responses<columnInterface>>{
    //   return await this.item.changeEnable(id);
    // }
    findByName(nameRecipe) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const RecipeByDishesAndIngredientDomain = yield recipe_domain_1.default.find({ 'dishes': nameRecipe })
                    .populate({
                    path: "ingredients",
                    // select: "name , quantity",
                })
                    .lean()
                    .exec();
                // const maper = RecipeByDishesAndIngredientDomain.map((value:any)=>{
                // //   var dishes = value.dishes;
                // //   console.log(dishes);
                // //   console.log(dishes.name);
                // //   if (dishes.name !== dishesName) {
                // //     // console.log(dishes.name);
                // //     // 'dishes.name':'flutter Mercadopago'
                // //  }
                //   console.log(value);
                // })
                // console.log(RecipeByDishesAndIngredientDomain);
                return { success: true, data: RecipeByDishesAndIngredientDomain };
            }
            catch (error) {
                console.log("Hable con el administrador: ", error);
                return { success: false, data: [] };
            }
        });
    }
}
exports.RecipeApplication = RecipeApplication;
