"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.db = void 0;
const knex_1 = require("knex");
const knexfile_1 = __importDefault(require("./knexfile"));
// const db = knex(knexfile.development);
exports.db = (0, knex_1.knex)(knexfile_1.default.development);
// module.exports = db;
