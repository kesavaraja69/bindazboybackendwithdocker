"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AudiobookChapterController = void 0;
const typeorm_1 = require("typeorm");
const audiochapter_repository_1 = require("../database/audio.chapter/repository/audiochapter.repository");
class AudiobookChapterController {
    static addaudiobookchapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryRepository = (0, typeorm_1.getCustomRepository)(audiochapter_repository_1.AudiobookchapterRepository);
            yield categoryRepository.addaudiobookchapter(req, res);
        });
    }
    static fetchaudiochapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryRepository = (0, typeorm_1.getCustomRepository)(audiochapter_repository_1.AudiobookchapterRepository);
            yield categoryRepository.fetchaudiochapter(req, res);
        });
    }
    static fetchaudiochapterwithaudio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryRepository = (0, typeorm_1.getCustomRepository)(audiochapter_repository_1.AudiobookchapterRepository);
            yield categoryRepository.fetchaudiochapterwithaudio(req, res);
        });
    }
}
exports.AudiobookChapterController = AudiobookChapterController;
