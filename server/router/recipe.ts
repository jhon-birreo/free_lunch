import { Router, Request, Response } from "express";
let router = Router();
import recipe from '../modules/recipe/infrastructure/recipe.controller'

// router.get("/test", (req: Request, res: Response) => {
//   res.send("TEsting");
// });
router.get('/recipe',recipe.findAll);
router.get('/recipe/create',recipe.create);
router.post('/recipe/save',recipe.save);
router.post('/recipe/ingredient',recipe.findById);
export default router;
