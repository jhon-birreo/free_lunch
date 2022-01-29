"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const shopping_controller_1 = __importDefault(require("../modules/shopping/infrastructure/shopping.controller"));
// router.get("/test", (req: Request, res: Response) => {
//   res.send("TEsting");
// });
router.get('/shopping', shopping_controller_1.default.findAll);
exports.default = router;
