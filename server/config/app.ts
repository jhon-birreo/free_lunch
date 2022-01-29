import express, { Application } from "express";
import * as socketio from "socket.io";
import { json, urlencoded } from "body-parser";
import { create } from "express-handlebars";
import _handlebars from "handlebars";
import { allowInsecurePrototypeAccess } from "@handlebars/allow-prototype-access";
import morgan from "morgan";
import * as redis from 'redis';
import { responseEnhancer } from "express-response-formatter";
import Router from "../router";
import cors from "cors";
import env from "./environment.json";
import path from "path";
import { OrderSocket } from "../modules/orders/infrastructure/order.socket.io";

export class App {
  private app: Application;
  constructor() {
    this.app = express();
    this.settingPort();
    this.middleware();
    this.publicView();
    this.staticFiles(); 
    this.redisConfig();
  }
  redisConfig(){
    const client = redis.createClient();
    client.on('connect', function () {
      console.log('Server redis connect');
    });
  }
  publicView() {
    
    this.app.set("views", path.join(__dirname, "../../public/views"));
    const hbs = create({
      defaultLayout: "main",
      extname: ".hbs",
      layoutsDir: path.join(this.app.get("views"), "layouts"),
      partialsDir: path.join(this.app.get("views"), "partials"),
      helpers: require("../helpers/helper"),
      handlebars: allowInsecurePrototypeAccess(_handlebars),
    });
    this.app.engine(".hbs", hbs.engine);
    this.app.set("view engine", "hbs");
  }
  staticFiles() {
    this.app.use(express.static(path.join(__dirname, "../../public")));
  }
  async listen() {
    const server = await this.app.listen(this.app.get("port"), () => {
      console.log(`Servidor : http://localhost:${this.app.get("port")}`);
    });
    const io = new socketio.Server(server);
    
    OrderSocket(io);
   
  }
  settingPort() {
    this.app.set("port", env.PORT || 3000);
  }
  middleware() {
    this.app.use(urlencoded({ extended: true }));
    this.app.use(json());
    this.app.use(morgan("dev"));
    this.app.use(cors());
    this.app.use(responseEnhancer());
  }
  routes() {
    this.app.use(Router);
  }
}
