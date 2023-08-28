"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassRouter = void 0;
const express_1 = require("express");
const forgotpassword_controller_1 = require("../controllers/forgotpassword.controller");
const ForgotPassRouter = (0, express_1.Router)();
exports.ForgotPassRouter = ForgotPassRouter;
//! post
ForgotPassRouter.post("/user", forgotpassword_controller_1.ForgotPassController.createNewLink);
ForgotPassRouter.post("/rest-password/:useremail", forgotpassword_controller_1.ForgotPassController.restForgotPassword);
ForgotPassRouter.post("/userverifyemailsendrid", forgotpassword_controller_1.ForgotPassController.sendgridemail);
ForgotPassRouter.post("/userverifyemail", forgotpassword_controller_1.ForgotPassController.otpverfiycationemail);
ForgotPassRouter.post("/usersendotpemail", forgotpassword_controller_1.ForgotPassController.otpsendverfiycationemail);
//!update
ForgotPassRouter.put("/update-password/:useremail", forgotpassword_controller_1.ForgotPassController.updatePassword);
