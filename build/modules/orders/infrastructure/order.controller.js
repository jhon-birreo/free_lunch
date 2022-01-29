"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const orders_application_1 = require("../application/orders.application");
const dishes_application_1 = require("../../dishes/application/dishes.application");
const order_socket_io_1 = require("./order.socket.io");
const Order = new orders_application_1.OrderApplication();
const Dishes = new dishes_application_1.DishesApplication();
class OrderInfrastructure {
    constructor() {
        this.findAll = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const order = yield Order.findAll();
            console.log(order);
            res.render("order/index", { title: 'order', data: order.data });
        });
        this.create = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const data = yield Dishes.findAll();
            const valor = (data.data[(Math.random() * data.data.length) | 0]);
            (0, order_socket_io_1.OrderQueue)(valor);
            return res.status(201).json({
                message: `Preparando ${valor.name}`
            });
        });
        this.save = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield Order.create(body);
            res.redirect("/order");
        });
        this.updateStatus = (req, res) => __awaiter(this, void 0, void 0, function* () {
            const body = req.body;
            yield Promise.all(body.data.map((value) => __awaiter(this, void 0, void 0, function* () {
                yield Order.updateByStatus({ id: value.id, status: 'entregado' });
            })));
            (0, order_socket_io_1.sendOrderToHistory)();
            return res.status(201).json({
                success: true,
                message: 'Correcto!'
            });
        });
    }
}
exports.default = new OrderInfrastructure();
