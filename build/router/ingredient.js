"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const ingredient_controller_1 = __importDefault(require("../modules/ingredients/infrastructure/ingredient.controller"));
router.get('/ingredient', ingredient_controller_1.default.findAll);
router.get('/ingredient/create', ingredient_controller_1.default.create);
router.post('/ingredient/save', ingredient_controller_1.default.save);
exports.default = router;
