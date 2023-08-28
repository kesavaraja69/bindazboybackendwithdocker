import Router from "express";
import { AuthenticationController } from "../controllers/authentication.controllers";

const authenticationRouter = Router();

//! Get
authenticationRouter.get("/users", AuthenticationController.fetchusers);

//! Post
authenticationRouter.post("/login", AuthenticationController.login);
authenticationRouter.post(
  "/create-new-account",
  AuthenticationController.createNewAccount
);
authenticationRouter.post(
  "/verifymockdata",
  AuthenticationController.decodejwt
);

export { authenticationRouter };
