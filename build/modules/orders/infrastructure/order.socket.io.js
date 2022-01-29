"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.sendOrderToHistory = exports.OrderQueue = exports.OrderSocket = void 0;
const bull_1 = __importDefault(require("bull"));
const environment_json_1 = __importDefault(require("../../../config/environment.json"));
const cross_fetch_1 = __importDefault(require("cross-fetch"));
const orders_application_1 = require("../application/orders.application");
const recipe_application_1 = require("../../recipe/application/recipe.application");
const ingredient_application_1 = require("../../ingredients/application/ingredient.application");
const shopping_application_1 = require("../../shopping/application/shopping.application");
let io;
const Recipe = new recipe_application_1.RecipeApplication();
const Ingredient = new ingredient_application_1.IngredientApplication();
const Order = new orders_application_1.OrderApplication();
const Shopping = new shopping_application_1.ShoppingApplication;
const OrderSocket = (socket) => {
    io = socket;
    io.on("connection", (payload) => {
        console.log("client socket connection !", payload.id);
    });
};
exports.OrderSocket = OrderSocket;
const OrderQueue = (params) => {
    const job = new bull_1.default(`setting-up-database-${new Date().getTime()}`, `redis://${environment_json_1.default.REDIS_HOST}:${environment_json_1.default.REDIS_PORT}`);
    job.add(Object.assign({}, params));
    job.process((job, done) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            yield orderProcess(job.data);
            done();
        }
        catch (e) {
            console.error(e);
        }
    }));
};
exports.OrderQueue = OrderQueue;
const orderProcess = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield recipeFind(payload.name);
    if (data.success && data.data.length > 1) {
        yield validateQuantity(data.data, payload, () => __awaiter(void 0, void 0, void 0, function* () {
            const newdata = yield recipeFind(payload.name);
            const res = yield validateOrder(newdata.data);
            if (res) {
                try {
                    const createOrder = {
                        n_order: Math.floor(1000 + Math.random() * 90000000),
                        dishes: payload.name,
                        status: 'listo'
                    };
                    yield Order.create(createOrder);
                    const data = yield recipeFind(payload.name);
                    if (data.success) {
                        yield dicountQnatity(data.data);
                    }
                    const getOrderStatus = yield Order.findByStatus();
                    io.emit("order:available", getOrderStatus);
                }
                catch (error) {
                    console.log(error);
                }
            }
        }));
    }
});
const dicountQnatity = (data) => __awaiter(void 0, void 0, void 0, function* () {
    yield Promise.all(data.map((value) => __awaiter(void 0, void 0, void 0, function* () {
        const qDisc = value.quantity;
        const newQuantity = value.ingredients.quantity - qDisc;
        const dataUpdate = {
            name: value.ingredients.name,
            quantity: newQuantity
        };
        yield Ingredient.update(dataUpdate);
    })));
});
const recipeFind = (name) => __awaiter(void 0, void 0, void 0, function* () {
    const data = yield Recipe.findByName(name);
    return data;
});
const validateQuantity = (data, payload, callback) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const get = yield Promise.all(data.map((value) => __awaiter(void 0, void 0, void 0, function* () {
            let quantity = value.quantity;
            let nameIngredient = value.ingredients.name;
            if (quantity > value.ingredients.quantity) {
                let initValue = 0;
                let quantityShop = 0;
                const find = yield Ingredient.findOne(nameIngredient);
                console.log('Find one');
                console.log(find);
                const quantityDB = find.data.quantity;
                while (initValue < quantity) {
                    let MarketplaceQuantity = yield getMarketplace(nameIngredient, payload);
                    quantityShop = MarketplaceQuantity.quantity;
                    initValue = MarketplaceQuantity.quantity + quantityDB;
                }
                yield Ingredient.update({ name: value.ingredients.name, quantity: initValue });
                yield Shopping.create({ ingredients: find.data.id, quantity: quantityShop });
            }
        })));
        callback();
    }
    catch (error) {
        console.log(error);
    }
});
const getMarketplace = (nameIngredient, payload) => __awaiter(void 0, void 0, void 0, function* () {
    var url = `https://recruitment.alegra.com/api/farmers-market/buy?ingredient=${nameIngredient}`;
    try {
        const res = yield (0, cross_fetch_1.default)(url);
        const quantity = yield res.json();
        return { success: true, quantity: quantity.quantitySold };
    }
    catch (err) {
        console.error(err);
        return { success: false, quantity: 0 };
    }
});
const validateOrder = (data) => __awaiter(void 0, void 0, void 0, function* () {
    const arrayBool = [];
    yield data.map((value) => __awaiter(void 0, void 0, void 0, function* () {
        let quantity = value.quantity;
        let nameIngredient = value.ingredients.name;
        if (value.ingredients.quantity >= quantity) {
            arrayBool.push(true);
        }
        else {
            arrayBool.push(false);
        }
    }));
    return !arrayBool.some((val) => val == false);
});
const sendOrderToHistory = () => __awaiter(void 0, void 0, void 0, function* () {
    const res = yield Order.findAll();
    io.emit("order:delivered", res);
});
exports.sendOrderToHistory = sendOrderToHistory;
