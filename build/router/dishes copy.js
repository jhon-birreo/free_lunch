"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const dishes_controller_1 = __importDefault(require("../modules/dishes/infrastructure/dishes.controller"));
// router.get("/test", (req: Request, res: Response) => {
//   res.send("TEsting");
// });
router.get('/dishes', dishes_controller_1.default.findAll);
router.get('/dishes/create', dishes_controller_1.default.create);
router.post('/dishes/save', dishes_controller_1.default.save);
exports.default = router;
