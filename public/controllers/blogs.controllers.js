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
exports.BlogsController = void 0;
const typeorm_1 = require("typeorm");
const blogs_repository_1 = require("../database/blogs/repository/blogs.repository");
class BlogsController {
    static addBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.addBlogs(req, res);
        });
    }
    static imagekitioupload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.imagekitioupload(req, res);
        });
    }
    static removefile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.removefile(req, res);
        });
    }
    static imagekitiouploadimages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.imagekitiouploadimages(req, res);
        });
    }
    static addviewpost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.addviewpost(req, res);
        });
    }
    static searchBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.searchBlogs(req, res);
        });
    }
    static updateBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.updateBlogs(req, res);
        });
    }
    static updateimageBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.updateimageBlog(req, res);
        });
    }
    static updateaudioBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.updateaudioBlog(req, res);
        });
    }
    static fetchBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.fetchBlogs(req, res);
        });
    }
    static fetchBlogswithlimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.fetchBlogswithlimit(req, res);
        });
    }
    static categoryBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.categoryBlogs(req, res);
        });
    }
    static fetchCategoryblogswithlimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.fetchCategoryblogswithlimit(req, res);
        });
    }
    static loadingBlogsDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.loadingBlogsDetail(req, res);
        });
    }
    static updateimagesBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.updateimagesBlog(req, res);
        });
    }
    static deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.deleteBlog(req, res);
        });
    }
    //! upload all file to storage server
    static imageuploadtoStorageserver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsRepository = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
            yield blogsRepository.imageuploadtoStorageserver(req, res);
        });
    }
}
exports.BlogsController = BlogsController;
