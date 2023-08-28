"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audiobookchapterRouter = void 0;
const express_1 = __importDefault(require("express"));
const audiobookchapter_controller_1 = require("../controllers/audiobookchapter.controller");
const audiobookchapterRouter = (0, express_1.default)();
exports.audiobookchapterRouter = audiobookchapterRouter;
//! post
audiobookchapterRouter.post("/addchapters", audiobookchapter_controller_1.AudiobookChapterController.addaudiobookchapter);
//! get
audiobookchapterRouter.get("/fetchchapters", audiobookchapter_controller_1.AudiobookChapterController.fetchaudiochapter);
audiobookchapterRouter.get("/fetchchapterswithaudio/:audioid/:audiochapterid", audiobookchapter_controller_1.AudiobookChapterController.fetchaudiochapterwithaudio);
