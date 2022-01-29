import { RecipeInterface } from "../infrastructure/interface/recipe.interface";
import RecipeDomain from "../domain/recipe.domain";
import IngredientDomain from "../../ingredients/domain/ingredient.domain";
import { parse } from "handlebars";
import { json } from "body-parser";

export class RecipeApplication {
  async findAll(): Promise<any> {
    try {
      const recipeDomain = await RecipeDomain.find({})
        .populate({
          path: "ingredients",
          // select: "name , quantity",
        })
        .lean()
        .sort({ dishes: "asc"})
        .exec();
        
      return { success: true, data: recipeDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async findById(value:any): Promise<any> {
    try {
      const recipeDomain = await RecipeDomain.find({dishes: value})
      .populate({
        path: "ingredients",
        // select: "name , quantity",
      })
      .lean()
      .exec();
      return { success: true, data: recipeDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async create(value: RecipeInterface): Promise<any> {
    try {
      const newInsert = await new RecipeDomain(value).save();
      return { success: true, data: newInsert };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
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
  async findByName(nameRecipe:any): Promise<any> {
    try {
      const RecipeByDishesAndIngredientDomain = await RecipeDomain.find({'dishes':nameRecipe})
        .populate({
          path: "ingredients",
          // select: "name , quantity",
        })
        .lean()
        .exec();
      return { success: true, data: RecipeByDishesAndIngredientDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
}
