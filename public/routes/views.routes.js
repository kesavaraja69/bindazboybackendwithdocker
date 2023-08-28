"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.viewsRouter = void 0;
const express_1 = __importDefault(require("express"));
const views_controller_1 = require("../controllers/views.controller");
const viewsRouter = (0, express_1.default)();
exports.viewsRouter = viewsRouter;
//! get
viewsRouter.get("/fetchpost/:blog_id", views_controller_1.ViewController.fetchViews);
viewsRouter.get("/checkviewpost/:useremail/:blog_id", views_controller_1.ViewController.checkuserView);
//! post
viewsRouter.post("/addviewpost", views_controller_1.ViewController.addViews);
