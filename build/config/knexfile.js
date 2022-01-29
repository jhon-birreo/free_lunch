"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import { Knex } from "knex";
const environment_json_1 = __importDefault(require("./environment.json"));
exports.default = {
    development: {
        client: "pg",
        connection: {
            user: environment_json_1.default.DB_USER,
            host: environment_json_1.default.DB_HOST,
            port: environment_json_1.default.DB_PORT,
            database: environment_json_1.default.DB_DATABASE,
            password: environment_json_1.default.DB_PASSWORD,
        },
        pool: {
            min: 2,
            max: 20,
        },
        migrations: {
            // loadExtensions: [".ts"],
            extension: "ts",
            // tableName: "admin_migrations",
            directory: "../system/migrations"
        },
        useNullAsDefault: true,
    }
};
