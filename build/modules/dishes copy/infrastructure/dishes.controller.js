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
const dishes_application_1 = require("../application/dishes.application");
const ingredient_application_1 = require("../../ingredients/application/ingredient.application");
const Dishes = new dishes_application_1.DishesApplication();
const Ingredients = new ingredient_application_1.IngredientApplication();
class DishesInfrastructure {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const dishes = yield Dishes.findAll();
            res.render("dishes/index", { title: 'dishes', data: dishes.data });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ingredient = yield Ingredients.findAll();
            res.render("dishes/create", { title: "dishes - create", data: ingredient.data });
        });
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield Dishes.create(body);
            res.redirect("/dishes");
        });
    }
}
exports.default = new DishesInfrastructure();
