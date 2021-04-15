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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.expressLoader = void 0;
var body_parser_1 = require("body-parser");
var cors_1 = __importDefault(require("cors"));
var authRoutes = __importStar(require("../routes/auth_utils"));
var userRoutes = __importStar(require("../routes/user_utils"));
var verify_token_1 = require("../middlewares/verify_token");
var expressLoader = function (app) {
    app.use(body_parser_1.json());
    app.use(cors_1.default());
    app.post("/register", authRoutes.register);
    app.post("/login", authRoutes.login);
    app.post("/addUser", userRoutes.addUser);
    app.get("/userRoutes", verify_token_1.verifyToken, userRoutes.myInfo);
};
exports.expressLoader = expressLoader;
