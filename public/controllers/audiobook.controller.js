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
exports.AudiobookController = void 0;
const typeorm_1 = require("typeorm");
const audiobook_repository_1 = require("../database/audiobooks/repositry/audiobook.repository");
class AudiobookController {
    static addaudiobook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(audiobook_repository_1.AudioBookRepository);
            yield blogsRepository.addaudiobook(req, res);
        });
    }
    static fetchaudiobooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(audiobook_repository_1.AudioBookRepository);
            yield blogsRepository.fetchaudiobooks(req, res);
        });
    }
    static fetchaudiobookwithchapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(audiobook_repository_1.AudioBookRepository);
            yield blogsRepository.fetchaudiobookwithchapter(req, res);
        });
    }
}
exports.AudiobookController = AudiobookController;
