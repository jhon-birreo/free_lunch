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
const ingredient_application_1 = require("../application/ingredient.application");
const Ingredient = new ingredient_application_1.IngredientApplication();
class IngredientInfrastructure {
    constructor() {
        // find: RequestHandler = async (req: Request, res: Response) => {
        //   const ingredient: responseGlobal = await Ingredient.findAll();
        //   return res.status(201).json({
        //     data:ingredient.data
        //   });
        // };
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const ingredient = yield Ingredient.findAll();
            res.render("ingredient/index", { title: 'ingredient', data: ingredient.data });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            res.render("ingredient/create", { title: "ingredient - create" });
        });
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield Ingredient.create(body);
            res.redirect("/ingredient");
        });
    }
}
exports.default = new IngredientInfrastructure();
