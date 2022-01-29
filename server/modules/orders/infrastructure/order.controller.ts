import { json } from "body-parser";

import { Request, RequestHandler, Response } from "express";
import { OrderApplication } from "../application/orders.application";
import { DishesApplication } from "../../dishes/application/dishes.application";
import {Socket} from 'socket.io';
import {
  OrderInterface,
  responseGlobal,
} from "./interface/order.interface";
import { OrderQueue,sendOrderToHistory } from "./order.socket.io";
const Order = new OrderApplication();
const Dishes = new DishesApplication();

class OrderInfrastructure {
  
  findAll: RequestHandler = async (req: Request, res: Response) => {
    const order: responseGlobal = await Order.findAll();
    res.render("order/index",{title: 'order',data:order.data});
  };
  create: RequestHandler = async (req: Request, res: Response) => {
    const data: responseGlobal = await Dishes.findAll();
    
    const valor:any = (data.data[(Math.random() * data.data.length) | 0]);
    OrderQueue(valor);
    return res.status(201).json({
      message:`Preparando ${valor.name}`
    });
  };
  save: RequestHandler = async (req: Request, res: Response) => {
    const body: OrderInterface = req.body;
    await Order.create(body);
    res.redirect("/order");
  };
  updateStatus: RequestHandler = async (req: Request, res: Response) => {
    const body: any = req.body;
    await Promise.all(
      body.data.map( async (value:any)=>{
        await Order.updateByStatus({id:value.id,status:'entregado'});
      })
    );
    sendOrderToHistory();
    return res.status(201).json({
      success:true,
      message:'Correcto!'
    });
  };
}
export default new OrderInfrastructure();
