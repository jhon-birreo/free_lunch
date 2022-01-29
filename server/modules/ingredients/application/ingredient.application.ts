import { IngredientInterface } from "../infrastructure/interface/ingredient.interface";
import IngredientDomain from "../domain/ingredient.domain";

export class IngredientApplication {
  async findAll(): Promise<any> {
    try {
      const find = await IngredientDomain.find({});
      return { success: true, data: find };
    } catch (error) {
      return { success: false, data: [] };
    }
  }
  async create(value: IngredientInterface): Promise<any> {
    try {
      const newInsert = await new IngredientDomain({
        name: value.name,
        quantity: value.quantity,
      }).save();
      return { success: true, data: newInsert };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async update(value: any): Promise<any> {

    try {
      const name = value.name;
      const quantity = value.quantity ;

      const update = await IngredientDomain.findOneAndUpdate(
        { name },
        { $set: { quantity } },
        { new: true }
      );
      return { success: true, data: update };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async findOne(name:any):Promise<any>{
    try {
      const find = await IngredientDomain.findOne({ name }).exec();
      return { success: true, data: find };
    } catch (error) {
      return { success: false, data: [] };
    }
  }
}
