import { Router, Request, Response } from "express";
let router = Router();
import ingredient from '../modules/ingredients/infrastructure/ingredient.controller'

router.get('/ingredient',ingredient.findAll);
router.get('/ingredient/create',ingredient.create);
router.post('/ingredient/save',ingredient.save);

export default router;
