"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.audiobookRouter = void 0;
const express_1 = __importDefault(require("express"));
const audiobook_controller_1 = require("../controllers/audiobook.controller");
const audiobookRouter = (0, express_1.default)();
exports.audiobookRouter = audiobookRouter;
//! post
audiobookRouter.post("/addaudiobook", audiobook_controller_1.AudiobookController.addaudiobook);
//! get
audiobookRouter.get("/fetchallaudiobook", audiobook_controller_1.AudiobookController.fetchaudiobooks);
audiobookRouter.get("/fetchaudiobookithchapter/:audioid", audiobook_controller_1.AudiobookController.fetchaudiobookwithchapter);
