import { DishesInterface } from "../infrastructure/interface/dishes.interface";
import DishesDomain from "../domain/dishes.domain";
import IngredientDomain from "../../ingredients/domain/ingredient.domain";
import { parse } from "handlebars";
import { json } from "body-parser";

export class DishesApplication {
  async findAll(): Promise<any> {

    try {
      const DishesByIngredientDomain = await DishesDomain.find({})
        .populate({
          path: "ingredients",
          // match: { age: { $gte: 21 } },
          select: "name , quantity",
        })
        .lean().exec();
      return { success: true, data: DishesByIngredientDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async findById(value:any): Promise<any> {
    try {
      const recipeDomain = await DishesDomain.findOne({name: value})
      .populate({
        path: "ingredients",
        // select: "name , quantity",
      })
      .lean()
      // .sort({ dishes: "asc", ingredients: "desc" })
      .exec();

      return { success: true, data: recipeDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async create(value: DishesInterface): Promise<any> {

    try {
      const newInsert = await new DishesDomain({
        name: value.name,
        ingredients: value.ingredients,
      }).save();
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
}
