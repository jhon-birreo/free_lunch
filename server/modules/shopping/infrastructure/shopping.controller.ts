import { json } from "body-parser";
import { Request, RequestHandler, Response } from "express";
import { ShoppingApplication } from "../application/shopping.application";
import { IngredientApplication } from "../../ingredients/application/ingredient.application";
import { DishesApplication } from "../../dishes/application/dishes.application";
// import { validationResult } from "express-validator";
import { ShoppingInterface, responseGlobal } from "./interface/shippong.interface";
const Shopping = new ShoppingApplication();
const Ingredients = new IngredientApplication();
const Dishes = new DishesApplication();

class ShoppingInfrastructure {
  findAll: RequestHandler = async (req: Request, res: Response) => {
    const shopping: responseGlobal = await Shopping.findAll();
    res.render("shopping/index", { title: "shopping", data: shopping.data });
  };
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
export default new ShoppingInfrastructure();
