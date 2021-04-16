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
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
var index_1 = __importDefault(require("../config/index"));
var jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
var bcrypt = __importStar(require("bcrypt"));
var user_services_1 = require("../services/user_services");
var userService = new user_services_1.UserService();
var register = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, name, hashedPassword, _b, userExists, doc, token, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password, name = _a.name;
                //check if email and password exist in the body
                if (!email || !password || !name) {
                    return [2 /*return*/, res.json({
                            success: false,
                            message: "Please provide neccessary fields for the registration!",
                        })];
                }
                _d.label = 1;
            case 1:
                _d.trys.push([1, 3, , 4]);
                return [4 /*yield*/, bcrypt.hash(password, 10)];
            case 2:
                hashedPassword = _d.sent();
                return [3 /*break*/, 4];
            case 3:
                _b = _d.sent();
                return [2 /*return*/, res.json({
                        success: false,
                        message: "Internal server error: hashing password failed",
                    })];
            case 4: return [4 /*yield*/, userService.checkUserExistencyByEmail(email)];
            case 5:
                userExists = _d.sent();
                if (userExists)
                    return [2 /*return*/, res.json({
                            success: false,
                            message: "User with the email " + email + " exists alreaady",
                        })];
                return [4 /*yield*/, userService.addUser({
                        email: email,
                        password: hashedPassword,
                        createdOn: Date.now(),
                        name: name,
                    })];
            case 6:
                doc = _d.sent();
                if (!doc) {
                    return [2 /*return*/, res.json({
                            success: false,
                            message: "Internal server: Writing user info into database failed",
                        })];
                }
                _d.label = 7;
            case 7:
                _d.trys.push([7, 9, , 10]);
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ id: doc._id, email: doc.email }, index_1.default.jWTSecretKey, {
                        algorithm: "HS256",
                    })];
            case 8:
                token = _d.sent();
                res.json({ success: true, token: token });
                return [3 /*break*/, 10];
            case 9:
                _c = _d.sent();
                res.json({
                    message: "Internal server: signing jwt failed!",
                    success: false,
                });
                return [3 /*break*/, 10];
            case 10: return [2 /*return*/];
        }
    });
}); };
exports.register = register;
var login = function (req, res) { return __awaiter(void 0, void 0, void 0, function () {
    var _a, email, password, doc, success, _b, token, _c;
    return __generator(this, function (_d) {
        switch (_d.label) {
            case 0:
                _a = req.body, email = _a.email, password = _a.password;
                if (!email || !password) {
                    return [2 /*return*/, res.json({
                            success: false,
                            message: "Email or/and password is missing!",
                        })];
                }
                return [4 /*yield*/, userService.getUserByEmail(email)];
            case 1:
                doc = _d.sent();
                if (!doc) {
                    return [2 /*return*/, res.json({
                            success: false,
                            message: "Your email " + email + " doesn't exist",
                        })];
                }
                _d.label = 2;
            case 2:
                _d.trys.push([2, 4, , 5]);
                return [4 /*yield*/, bcrypt.compare(password, doc.password)];
            case 3:
                success = _d.sent();
                if (!success)
                    return [2 /*return*/, res.json({
                            success: false,
                            message: "Password is wrong!",
                        })];
                return [3 /*break*/, 5];
            case 4:
                _b = _d.sent();
                res.json({
                    success: false,
                    message: "Internal server: comparing password doesn't work.",
                });
                return [3 /*break*/, 5];
            case 5:
                _d.trys.push([5, 7, , 8]);
                return [4 /*yield*/, jsonwebtoken_1.default.sign({ id: doc._id, email: doc.email }, index_1.default.jWTSecretKey, {
                        algorithm: "HS256",
                    })];
            case 6:
                token = _d.sent();
                res.json({ success: true, token: token });
                return [3 /*break*/, 8];
            case 7:
                _c = _d.sent();
                res.json({
                    message: "We couldn't generate a token for you!",
                    success: false,
                });
                return [3 /*break*/, 8];
            case 8: return [2 /*return*/];
        }
    });
}); };
exports.login = login;
