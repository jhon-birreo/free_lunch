import { Router, Request, Response } from "express";
let router = Router();
import order from '../modules/orders/infrastructure/order.controller'

router.get('/order',order.findAll);
router.get('/order/create',order.create);
router.post('/order/save',order.save);
router.post('/order/update/status',order.updateStatus);

export default router;
