import { Router } from "express";
import { ForgotPassController } from "../controllers/forgotpassword.controller";

const ForgotPassRouter = Router();

//! post
ForgotPassRouter.post("/user", ForgotPassController.createNewLink);
ForgotPassRouter.post(
  "/rest-password/:useremail",
  ForgotPassController.restForgotPassword
);
ForgotPassRouter.post("/userverifyemailsendrid", ForgotPassController.sendgridemail);
ForgotPassRouter.post("/userverifyemail", ForgotPassController.otpverfiycationemail);
ForgotPassRouter.post("/usersendotpemail", ForgotPassController.otpsendverfiycationemail);

//!update
ForgotPassRouter.put(
  "/update-password/:useremail",
  ForgotPassController.updatePassword
);


export { ForgotPassRouter };
