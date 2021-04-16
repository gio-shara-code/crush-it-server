"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var dotenv_1 = __importDefault(require("dotenv"));
// config() will read your .env file, parse the contents, assign it to process.env.
dotenv_1.default.config();
if (!process.env.JWT_SECRET_KEY) {
    console.log("JWT_SECRET_KEY is undefined in .env file");
    process.exit();
}
exports.default = {
    jWTSecretKey: process.env.JWT_SECRET_KEY,
    port: process.env.PORT || 300,
    db: {
        username: "gio_shara123",
        password: "shara123",
        name: "demo-database",
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: false,
            useCreateIndex: true,
        },
    },
};
