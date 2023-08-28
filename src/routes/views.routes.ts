import Router from "express";
import { ViewController } from "../controllers/views.controller";

const viewsRouter = Router();


//! get
viewsRouter.get("/fetchpost/:blog_id", ViewController.fetchViews);
viewsRouter.get("/checkviewpost/:useremail/:blog_id", ViewController.checkuserView);

//! post
viewsRouter.post("/addviewpost", ViewController.addViews);


export {viewsRouter}