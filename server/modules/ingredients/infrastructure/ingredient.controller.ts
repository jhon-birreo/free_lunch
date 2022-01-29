import { json } from "body-parser";
import { Request, RequestHandler, Response } from "express";
import { IngredientApplication } from "../application/ingredient.application";
// import { validationResult } from "express-validator";
import {
  IngredientInterface,
  responseGlobal,
} from "./interface/ingredient.interface";
const Ingredient = new IngredientApplication();

class IngredientInfrastructure {

  // find: RequestHandler = async (req: Request, res: Response) => {
  //   const ingredient: responseGlobal = await Ingredient.findAll();
  //   return res.status(201).json({
  //     data:ingredient.data
  //   });
  // };

  findAll: RequestHandler = async (req: Request, res: Response) => {
    const ingredient: responseGlobal = await Ingredient.findAll();
    res.render("ingredient/index",{title: 'ingredient',data:ingredient.data});
  };

  create: RequestHandler = async (req: Request, res: Response) => {
    res.render("ingredient/create", { title: "ingredient - create" });
  };

  save: RequestHandler = async (req: Request, res: Response) => {
    const body: IngredientInterface = req.body;
    await Ingredient.create(body);
    res.redirect("/ingredient");
  };

}
export default new IngredientInfrastructure();
