"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.categoryRouter = void 0;
const express_1 = __importDefault(require("express"));
const categorys_controller_1 = require("../controllers/categorys.controller");
const categoryRouter = (0, express_1.default)();
exports.categoryRouter = categoryRouter;
//! post
categoryRouter.post('/add', categorys_controller_1.CategoryController.addCategory);
//! get
categoryRouter.get('/categorys', categorys_controller_1.CategoryController.fetchCategorys);
categoryRouter.get('/categoryblogs/:catergory_title', categorys_controller_1.CategoryController.fetchCategoryblogs);
categoryRouter.get('/categoryblogswithlimit/:catergory_title/:pageno', categorys_controller_1.CategoryController.fetchCategoryblogswithlimit);
