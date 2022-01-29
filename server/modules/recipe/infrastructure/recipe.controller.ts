import { json } from "body-parser";
import { Request, RequestHandler, Response } from "express";
import { RecipeApplication } from "../application/recipe.application";
import { IngredientApplication } from "../../ingredients/application/ingredient.application";
import { DishesApplication } from "../../dishes/application/dishes.application";
// import { validationResult } from "express-validator";
import { RecipeInterface, responseGlobal } from "./interface/recipe.interface";
const Recipe = new RecipeApplication();
const Ingredients = new IngredientApplication();
const Dishes = new DishesApplication();

class RecipeInfrastructure {
  findAll: RequestHandler = async (req: Request, res: Response) => {
    const dishes: responseGlobal = await Recipe.findAll();
    res.render("recipe/index", { title: "recipe", data: dishes.data });
  };
  findById: RequestHandler = async (req: Request, res: Response) => {
    const body: any = req.body;
    const dishes: responseGlobal = await Dishes.findById(body.name);
    const recipe: responseGlobal = await Recipe.findById(body.name);

    return res.status(201).json({dis:dishes,res:recipe});
  };
  create: RequestHandler = async (req: Request, res: Response) => {
    const ingredient: responseGlobal = await Ingredients.findAll();
    const dishes: responseGlobal = await Dishes.findAll();
    res.render("recipe/create", {
      title: "recipe - create",
      ingredient: ingredient.data,
      dishes: dishes.data,
    });
  };
  save: RequestHandler = async (req: Request, res: Response) => {
    const body: RecipeInterface = req.body;
    await Recipe.create(body);
    const recipe: responseGlobal = await Recipe.findById(body.dishes);
    return res.status(201).json(recipe);
  };
}
export default new RecipeInfrastructure();
