"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.BookmarkBlogRepository = void 0;
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("../entity/bookmark.entity");
const user_repository_1 = require("../../repository/user.repository");
const blogs_repository_1 = require("../../blogs/repository/blogs.repository");
let BookmarkBlogRepository = class BookmarkBlogRepository extends typeorm_1.Repository {
    addBookmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail, blog_id } = req.body;
            let userinfoRepo = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            let userinfo = yield userinfoRepo.findOneBy({ useremail });
            var _isAlreadyBookmarked = (yield this.createQueryBuilder("bookmark_blog")
                .leftJoin("bookmark_blog.bookmark_user", "users")
                .leftJoin("bookmark_blog.bookmark_blogdata", "blogs")
                .select("bookmark_blog.bookmark_id")
                .where("users.useremail = :useremail", { useremail })
                .andWhere("blogs.blog_id = :blog_id", { blog_id })
                .getCount()) > 0;
            if (!_isAlreadyBookmarked) {
                let blogRepo = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
                let blogdata = yield blogRepo.findOneBy({ blog_id });
                let bookmarkBlogs = new bookmark_entity_1.BookmarkBlogEntity();
                bookmarkBlogs.bookmark_blogdata = blogdata;
                bookmarkBlogs.bookmark_user = userinfo;
                yield bookmarkBlogs
                    .save()
                    .then((data) => {
                    if (data !== undefined) {
                        return res.send({
                            code: 201,
                            message: "New bookmark created",
                        });
                    }
                })
                    .catch((error) => {
                    if (error !== undefined) {
                        return res.send({
                            code: 401,
                            message: "Something went wrong, Try again",
                        });
                    }
                });
            }
            else {
                console.log("Already bookmarked");
                return res.send({
                    code: 406,
                    message: "Hotel already bookmarked!",
                });
            }
        });
    }
    fetchBookmarksByUser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail } = req.params;
            try {
                let bookmarks = yield this.createQueryBuilder("bookmark_blog")
                    .leftJoin("bookmark_blog.bookmark_user", "users")
                    .leftJoinAndSelect("bookmark_blog.bookmark_blogdata", "blogs")
                    .where("users.useremail = :useremail", { useremail })
                    .getMany();
                if (bookmarks !== undefined) {
                    return res.send({
                        code: 200,
                        data: bookmarks,
                    });
                }
                else {
                    return res.send({
                        code: 404,
                        data: "Bookmark not found",
                    });
                }
            }
            catch (error) {
                if (error !== undefined) {
                    return res.send({
                        code: 401,
                        data: "Something went wrong",
                    });
                }
            }
        });
    }
    deleteBookmark(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { bookmark_id } = req.params;
            try {
                yield this.createQueryBuilder("bookmark_blog")
                    .delete()
                    .from(bookmark_entity_1.BookmarkBlogEntity)
                    .where("bookmark_blog.bookmark_id = :bookmark_id", { bookmark_id })
                    .execute()
                    .then((data) => {
                    var affected = data.affected;
                    console.log(affected);
                    if (affected > 0) {
                        return res.send({
                            code: 204,
                            message: "Bookmark deleted",
                        });
                    }
                    else {
                        return res.send({
                            code: 500,
                            message: "Something went wrong",
                        });
                    }
                });
            }
            catch (error) {
                console.log(error);
                return res.send({
                    code: 500,
                    message: "Something went wrong",
                });
            }
        });
    }
    checkIfBookmarkExists(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail, blog_id } = req.body;
            var _isAlreadyBookmarked = (yield this.createQueryBuilder("bookmark_blog")
                .leftJoin("bookmark_blog.bookmark_user", "users")
                .leftJoin("bookmark_blog.bookmark_blogdata", "blogs")
                .select("bookmark_blog.bookmark_id")
                .where("users.useremail = :useremail", { useremail })
                .andWhere("blogs.blog_id = :blog_id", { blog_id })
                .getCount()) > 0;
            if (_isAlreadyBookmarked) {
                return res.send({
                    code: 200,
                    bookmarked: true,
                });
            }
            if (!_isAlreadyBookmarked) {
                return res.send({
                    code: 404,
                    bookmarked: false,
                });
            }
        });
    }
};
BookmarkBlogRepository = __decorate([
    (0, typeorm_1.EntityRepository)(bookmark_entity_1.BookmarkBlogEntity)
], BookmarkBlogRepository);
exports.BookmarkBlogRepository = BookmarkBlogRepository;
