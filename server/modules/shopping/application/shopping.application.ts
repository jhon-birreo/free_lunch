import { ShoppingInterface } from "../infrastructure/interface/shippong.interface";
import ShoppingDomain from "../domain/shopping.domain";
import IngredientDomain from "../../ingredients/domain/ingredient.domain";
import { parse } from "handlebars";
import { json } from "body-parser";

export class ShoppingApplication {
  async findAll(): Promise<any> {
    try {
      let dishesName:any = null;
      const shoppingDomain = await ShoppingDomain.find({})
        .populate({
          path: "ingredients",
          // select: "name , quantity",
        })
        .lean()
        // .sort({ dishes: "asc", ingredients: "desc" })
        .exec();
      return { success: true, data: shoppingDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async create(value: any): Promise<any> {
    try {
      const newInsert = await new ShoppingDomain(value).save();
      return { success: true, data: newInsert };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
    }
}
