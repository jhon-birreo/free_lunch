import Queue from "bull";
import env from '../../../config/environment.json'
import fetch from 'cross-fetch'
import { OrderApplication } from "../application/orders.application";
import { RecipeApplication } from "../../recipe/application/recipe.application";
import { IngredientApplication } from "../../ingredients/application/ingredient.application";
import { ShoppingApplication } from "../../shopping/application/shopping.application";
let io: { on: (arg0: string, arg1: (payload: any) => void) => void; emit: (arg0: string, arg1: { msg: string; }) => void; };
const Recipe = new RecipeApplication();
const Ingredient = new IngredientApplication();
const Order = new OrderApplication();
const Shopping = new ShoppingApplication;
export const OrderSocket=(socket:any)=>{
  io=socket
  io.on("connection", (payload:any) => {
    console.log("client socket connection !", payload.id);
  });
}


export const OrderQueue=(params:any)=>{
    const job = new Queue(
      `setting-up-database-${new Date().getTime()}`,
      `redis://${env.REDIS_HOST}:${env.REDIS_PORT}`
    );
    job.add({
      ...params,
    });
    job.process(async (job, done) => {
      try {
        await orderProcess(job.data);
        done();
      } catch (e) {
        console.error(e);
      }
  
  });
}

const orderProcess = async (payload:any) => {
  const data = await recipeFind(payload.name);
  if (data.success && data.data.length > 1) {
    await validateQuantity(data.data,payload, async ()=>{

      const newdata = await recipeFind(payload.name);
      
      const res = await validateOrder(newdata.data);
      if (res) {
        try {
          const createOrder={
            n_order:Math.floor(1000 + Math.random() * 90000000),
            dishes:payload.name,
            status:'listo'
          }
          await Order.create(createOrder);
          const data = await recipeFind(payload.name);
          if (data.success) {
             await dicountQnatity(data.data);
          }
          const getOrderStatus = await Order.findByStatus();
          io.emit("order:available", getOrderStatus);
        } catch (error) {
          console.log(error);
        }
      }
    });
  }
}

const dicountQnatity = async (data:[]) => {
  await Promise.all( 
    data.map( async (value:any)=>{
      const qDisc = value.quantity;
      const newQuantity = value.ingredients.quantity - qDisc;
      const dataUpdate={
        name: value.ingredients.name,
        quantity: newQuantity
      }
      await Ingredient.update(dataUpdate);
    })
  );
}

const recipeFind = async(name:any) => {
  const data = await Recipe.findByName(name);
  return data;
}

const validateQuantity = async (data:[],payload:any ,callback:Function) => {
  try {
    const get = await Promise.all(
      data.map(async(value:any) =>{
        let quantity = value.quantity;
        let nameIngredient = value.ingredients.name;
        if (quantity > value.ingredients.quantity) {
          let initValue = 0;
          let quantityShop = 0;
          const find = await Ingredient.findOne(nameIngredient);
          const quantityDB =find.data.quantity
          while (initValue < quantity) {
            let MarketplaceQuantity = await getMarketplace(nameIngredient,payload);
            quantityShop = MarketplaceQuantity.quantity;
            initValue = MarketplaceQuantity.quantity + quantityDB;
          }
          await Ingredient.update({name:value.ingredients.name, quantity:initValue});
          await Shopping.create({ingredients:find.data.id,quantity:quantityShop});
        }
      })
    );
    callback();
  } catch (error) {
    console.log(error);
    
  }
}

const getMarketplace = async (nameIngredient: string, payload:{}) => {
  var url = `https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${nameIngredient}`;
  try {
    const res = await fetch(url);
    const quantity = await res.json();
    return {success: true , quantity: quantity.quantitySold};
  } catch (err) {
    console.error(err);
    return {success: false , quantity: 0};
  }
    
}

const validateOrder = async (data:[]) => {
  const arrayBool: Boolean[] = []
  await data.map(async(value:any) =>{
    let quantity = value.quantity;
    let nameIngredient = value.ingredients.name;
    if (value.ingredients.quantity >= quantity) {
      arrayBool.push(true)
    }else{
      arrayBool.push(false)
    }
  });  
  return !arrayBool.some((val:any) => val == false);
}


export const sendOrderToHistory = async() => {
  const res = await Order.findAll();
  io.emit("order:delivered", res);
}