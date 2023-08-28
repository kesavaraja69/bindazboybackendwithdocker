"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.adminauthenticationRouter = void 0;
const express_1 = __importDefault(require("express"));
const adminauthentication_controller_1 = require("../controllers/adminauthentication.controller");
const adminauthenticationRouter = (0, express_1.default)();
exports.adminauthenticationRouter = adminauthenticationRouter;
//! post
adminauthenticationRouter.post("/signup", adminauthentication_controller_1.AdminAuthenticationController.signup);
adminauthenticationRouter.post("/login", adminauthentication_controller_1.AdminAuthenticationController.login);
