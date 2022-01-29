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
Object.defineProperty(exports, "__esModule", { value: true });
const shopping_application_1 = require("../application/shopping.application");
const ingredient_application_1 = require("../../ingredients/application/ingredient.application");
const dishes_application_1 = require("../../dishes/application/dishes.application");
const Shopping = new shopping_application_1.ShoppingApplication();
const Ingredients = new ingredient_application_1.IngredientApplication();
const Dishes = new dishes_application_1.DishesApplication();
class ShoppingInfrastructure {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const shopping = yield Shopping.findAll();
            console.log(shopping);
            res.render("shopping/index", { title: "shopping", data: shopping.data });
        });
        // create: RequestHandler = async (req: Request, res: Response) => {
        //   const ingredient: responseGlobal = await Ingredients.findAll();
        //   const dishes: responseGlobal = await Dishes.findAll();
        //   res.render("recipe/create", {
        //     title: "recipe - create",
        //     ingredient: ingredient.data,
        //     dishes: dishes.data,
        //   });
        // };
        // save: RequestHandler = async (req: Request, res: Response) => {
        //   const body: ShoppingInterface = req.body;
        //   await Recipe.create(body);
        //   res.redirect("/recipe");
        // };
    }
}
exports.default = new ShoppingInfrastructure();
