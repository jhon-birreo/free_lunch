import { Router, Request, Response } from "express";
let router = Router();
import shopping from '../modules/shopping/infrastructure/shopping.controller'

// router.get("/test", (req: Request, res: Response) => {
//   res.send("TEsting");
// });
router.get('/shopping',shopping.findAll);
export default router;
