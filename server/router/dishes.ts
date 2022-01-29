import { Router, Request, Response } from "express";
let router = Router();
import dishes from '../modules/dishes/infrastructure/dishes.controller'

// router.get("/test", (req: Request, res: Response) => {
//   res.send("TEsting");
// });
router.get('/dishes',dishes.findAll);
router.get('/dishes/create',dishes.create);
router.post('/dishes/save',dishes.save);
export default router;
