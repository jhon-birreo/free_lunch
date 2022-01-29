"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
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
exports.App = void 0;
const express_1 = __importDefault(require("express"));
const socketio = __importStar(require("socket.io"));
const body_parser_1 = require("body-parser");
const express_handlebars_1 = require("express-handlebars");
const handlebars_1 = __importDefault(require("handlebars"));
const allow_prototype_access_1 = require("@handlebars/allow-prototype-access");
const morgan_1 = __importDefault(require("morgan"));
const redis = __importStar(require("redis"));
const express_response_formatter_1 = require("express-response-formatter");
const router_1 = __importDefault(require("../router"));
const cors_1 = __importDefault(require("cors"));
const environment_json_1 = __importDefault(require("./environment.json"));
const path_1 = __importDefault(require("path"));
const order_socket_io_1 = require("../modules/orders/infrastructure/order.socket.io");
class App {
    constructor() {
        this.app = (0, express_1.default)();
        this.settingPort();
        this.middleware();
        this.publicView();
        this.staticFiles();
        this.routes();
        this.redisConfig();
    }
    redisConfig() {
        const client = redis.createClient();
        client.on('connect', function () {
            console.log('Server redis connect');
        });
    }
    publicView() {
        this.app.set("views", path_1.default.join(__dirname, "../../public/views"));
        const hbs = (0, express_handlebars_1.create)({
            defaultLayout: "main",
            extname: ".hbs",
            layoutsDir: path_1.default.join(this.app.get("views"), "layouts"),
            partialsDir: path_1.default.join(this.app.get("views"), "partials"),
            // helpers: {
            //   math: function(lvalue:any, operator:string, rvalue:any) {lvalue = parseFloat(lvalue);
            //       rvalue = parseFloat(rvalue);
            //       return {
            //           "+": lvalue + rvalue,
            //           "-": lvalue - rvalue,
            //           "*": lvalue * rvalue,
            //           "/": lvalue / rvalue,
            //           "%": lvalue % rvalue
            //       }[operator];
            //   }
            // },
            helpers: require("../helpers/helper"),
            handlebars: (0, allow_prototype_access_1.allowInsecurePrototypeAccess)(handlebars_1.default),
        });
        this.app.engine(".hbs", hbs.engine);
        this.app.set("view engine", "hbs");
    }
    staticFiles() {
        this.app.use(express_1.default.static(path_1.default.join(__dirname, "../../public")));
    }
    listen() {
        return __awaiter(this, void 0, void 0, function* () {
            const server = yield this.app.listen(this.app.get("port"), () => {
                console.log(`Servidor : http://localhost:${this.app.get("port")}`);
            });
            const io = new socketio.Server(server);
            (0, order_socket_io_1.OrderSocket)(io);
        });
    }
    settingPort() {
        this.app.set("port", environment_json_1.default.PORT || 3000);
    }
    middleware() {
        this.app.use((0, body_parser_1.urlencoded)({ extended: true }));
        this.app.use((0, body_parser_1.json)());
        this.app.use((0, morgan_1.default)("dev"));
        this.app.use((0, cors_1.default)());
        this.app.use((0, express_response_formatter_1.responseEnhancer)());
    }
    routes() {
        this.app.use(router_1.default);
    }
}
exports.App = App;
