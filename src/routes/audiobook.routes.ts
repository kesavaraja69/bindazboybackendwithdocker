import Router from "express";
import { AudiobookController } from "../controllers/audiobook.controller";

const audiobookRouter = Router();

//! post
audiobookRouter.post("/addaudiobook", AudiobookController.addaudiobook);
//! get
audiobookRouter.get("/fetchallaudiobook", AudiobookController.fetchaudiobooks);
audiobookRouter.get("/fetchaudiobookithchapter/:audioid", AudiobookController.fetchaudiobookwithchapter);
//! update
//! delete

export { audiobookRouter };
