import Router from "express";
import { AudiobookChapterController } from "../controllers/audiobookchapter.controller";

const audiobookchapterRouter = Router();


//! post

audiobookchapterRouter.post("/addchapters", AudiobookChapterController.addaudiobookchapter);

//! get
audiobookchapterRouter.get("/fetchchapters", AudiobookChapterController.fetchaudiochapter);
audiobookchapterRouter.get("/fetchchapterswithaudio/:audioid/:audiochapterid", AudiobookChapterController.fetchaudiochapterwithaudio);

export { audiobookchapterRouter };
