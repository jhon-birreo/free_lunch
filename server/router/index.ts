import { Router, Request, Response, RequestHandler } from 'express';
let router = Router();
import ingredient from '../router/ingredient'
import dishes from '../router/dishes'
import order from '../router/order'
import recipe from '../router/recipe'
import shopping from '../router/shopping'

router.get('/',(req: Request, res: Response) => {
  res.render("welcome",{title:'Welcome'});
});
router.use(ingredient);
router.use(dishes);
router.use(order);
router.use(recipe);
router.use(shopping);
export default router;