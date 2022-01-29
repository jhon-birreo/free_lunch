import { json } from "body-parser";
import { Request, RequestHandler, Response } from "express";
import { DishesApplication } from "../application/dishes.application";
import { IngredientApplication } from "../../ingredients/application/ingredient.application";
// import { validationResult } from "express-validator";
import {
  DishesInterface,
  responseGlobal,
} from "./interface/dishes.interface";
const Dishes = new DishesApplication();
const Ingredients = new IngredientApplication();

class DishesInfrastructure {
  
  findAll: RequestHandler = async (req: Request, res: Response) => {
    const dishes: responseGlobal = await Dishes.findAll();
    res.render("dishes/index",{title: 'dishes',data:dishes.data});
  };
  create: RequestHandler = async (req: Request, res: Response) => {
    const ingredient: responseGlobal = await Ingredients.findAll();
    res.render("dishes/create", { title: "dishes - create",data:ingredient.data });
  };
  save: RequestHandler = async (req: Request, res: Response) => {
    const body: DishesInterface = req.body;
    await Dishes.create(body);
    res.redirect("/dishes");
  };
}
export default new DishesInfrastructure();
