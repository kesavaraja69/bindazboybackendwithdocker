"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticationRouter = void 0;
const express_1 = __importDefault(require("express"));
const authentication_controllers_1 = require("../controllers/authentication.controllers");
const authenticationRouter = (0, express_1.default)();
exports.authenticationRouter = authenticationRouter;
//! Get
authenticationRouter.get("/users", authentication_controllers_1.AuthenticationController.fetchusers);
//! Post
authenticationRouter.post("/login", authentication_controllers_1.AuthenticationController.login);
authenticationRouter.post("/create-new-account", authentication_controllers_1.AuthenticationController.createNewAccount);
authenticationRouter.post("/verifymockdata", authentication_controllers_1.AuthenticationController.decodejwt);
