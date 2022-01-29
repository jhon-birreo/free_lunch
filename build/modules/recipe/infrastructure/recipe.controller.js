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
const recipe_application_1 = require("../application/recipe.application");
const ingredient_application_1 = require("../../ingredients/application/ingredient.application");
const dishes_application_1 = require("../../dishes/application/dishes.application");
const Recipe = new recipe_application_1.RecipeApplication();
const Ingredients = new ingredient_application_1.IngredientApplication();
const Dishes = new dishes_application_1.DishesApplication();
class RecipeInfrastructure {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dishes = yield Recipe.findAll();
            console.log('diseeeee');
            console.log(dishes);
            res.render("recipe/index", { title: "recipe", data: dishes.data });
        });
        this.findById = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            const dishes = yield Dishes.findById(body.name);
            const recipe = yield Recipe.findById(body.name);
            return res.status(201).json({ dis: dishes, res: recipe });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ingredient = yield Ingredients.findAll();
            const dishes = yield Dishes.findAll();
            res.render("recipe/create", {
                title: "recipe - create",
                ingredient: ingredient.data,
                dishes: dishes.data,
            });
        });
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            console.log(body);
            yield Recipe.create(body);
            const recipe = yield Recipe.findById(body.dishes);
            return res.status(201).json(recipe);
        });
    }
}
exports.default = new RecipeInfrastructure();
