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
exports.BookmarkBlogContorller = void 0;
const globals_1 = require("typeorm/globals");
const bookmark_repository_1 = require("../database/bookmark/repo/bookmark.repository");
class BookmarkBlogContorller {
    static addBookmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookmarkHotelRepository = (0, globals_1.getCustomRepository)(bookmark_repository_1.BookmarkBlogRepository);
            yield bookmarkHotelRepository.addBookmark(req, res);
        });
    }
    static fetchBookmarksByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookmarkHotelRepository = (0, globals_1.getCustomRepository)(bookmark_repository_1.BookmarkBlogRepository);
            yield bookmarkHotelRepository.fetchBookmarksByUser(req, res);
        });
    }
    static deleteBookmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookmarkHotelRepository = (0, globals_1.getCustomRepository)(bookmark_repository_1.BookmarkBlogRepository);
            yield bookmarkHotelRepository.deleteBookmark(req, res);
        });
    }
    static checkIfBookmarkExists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let bookmarkHotelRepository = (0, globals_1.getCustomRepository)(bookmark_repository_1.BookmarkBlogRepository);
            yield bookmarkHotelRepository.checkIfBookmarkExists(req, res);
        });
    }
}
exports.BookmarkBlogContorller = BookmarkBlogContorller;
