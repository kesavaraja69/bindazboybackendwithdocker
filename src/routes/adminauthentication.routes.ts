import Router from "express";
import { AdminAuthenticationController } from "../controllers/adminauthentication.controller";


const adminauthenticationRouter = Router();

//! post
adminauthenticationRouter.post("/signup", AdminAuthenticationController.signup);
adminauthenticationRouter.post("/login", AdminAuthenticationController.login);

export { adminauthenticationRouter };
