"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
let router = (0, express_1.Router)();
const ingredient_1 = __importDefault(require("../router/ingredient"));
const dishes_1 = __importDefault(require("../router/dishes"));
const order_1 = __importDefault(require("../router/order"));
const recipe_1 = __importDefault(require("../router/recipe"));
const shopping_1 = __importDefault(require("../router/shopping"));
router.get('/', (req, res) => {
    res.render("welcome", { title: 'Welcome' });
});
router.use(ingredient_1.default);
router.use(dishes_1.default);
router.use(order_1.default);
router.use(recipe_1.default);
router.use(shopping_1.default);
exports.default = router;
