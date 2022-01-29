"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.mongooConnect = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const environment_json_1 = __importDefault(require("./environment.json"));
function mongooConnect() {
    const clientOption = {
        socketTimeoutMS: 30000,
        useNewUrlParser: true,
        useUnifiedTopology: true,
    };
    mongoose_1.default
        .connect(environment_json_1.default.MONGODB_URI, clientOption, () => {
        console.log('connect database mongoose!');
    });
}
exports.mongooConnect = mongooConnect;
