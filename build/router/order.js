"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const order_controller_1 = __importDefault(require("../modules/orders/infrastructure/order.controller"));
router.get('/order', order_controller_1.default.findAll);
router.get('/order/create', order_controller_1.default.create);
router.post('/order/save', order_controller_1.default.save);
router.post('/order/update/status', order_controller_1.default.updateStatus);
exports.default = router;
