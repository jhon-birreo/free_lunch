"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const recipe_controller_1 = __importDefault(require("../modules/recipe/infrastructure/recipe.controller"));
// router.get("/test", (req: Request, res: Response) => {
//   res.send("TEsting");
// });
router.get('/recipe', recipe_controller_1.default.findAll);
router.get('/recipe/create', recipe_controller_1.default.create);
router.post('/recipe/save', recipe_controller_1.default.save);
router.post('/recipe/ingredient', recipe_controller_1.default.findById);
exports.default = router;
