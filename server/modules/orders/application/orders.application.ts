import { OrderInterface } from "../infrastructure/interface/order.interface";
import OrderDomain from "../domain/order.domain";
import IngredientDomain from "../../ingredients/domain/ingredient.domain";
import { parse } from "handlebars";
import { json } from "body-parser";

export class OrderApplication {
  async findAll(): Promise<any> {

    try {
      const DishesByIngredientDomain = await OrderDomain.find({status:'entregado'}).exec();
      return { success: true, data: DishesByIngredientDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async findByStatus(): Promise<any> {

    try {
      const DishesByIngredientDomain = await OrderDomain.find({status:'listo'}).exec();
      return { success: true, data: DishesByIngredientDomain };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async create(value: any): Promise<any> {
    try {
      const newInsert = await new OrderDomain(value).save();
      return { success: true, data: newInsert };
    } catch (error) {
      console.log("Hable con el administrador: ", error);
      return { success: false, data: [] };
    }
  }
  async updateByStatus(value: any): Promise<any> {
    try {
      const update = await OrderDomain.findByIdAndUpdate(
        value.id,
        { status : value.status} ,
        { new: true }
      );
      //TODO: socket enviar los actualizados !
      return { success: true, data: update };
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
