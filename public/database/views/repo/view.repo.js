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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ViewsRepository = void 0;
const typeorm_1 = require("typeorm");
const view_entity_1 = require("../entity/view.entity");
const dotenv_1 = __importDefault(require("dotenv"));
const user_repository_1 = require("../../repository/user.repository");
const blogs_repository_1 = require("../../blogs/repository/blogs.repository");
dotenv_1.default.config();
let ViewsRepository = class ViewsRepository extends typeorm_1.Repository {
    //   //! fullscreenpost
    //   async addViews(req: Request, res: Response) {
    //     let { useremail, fs_post_id } = req.body;
    //     var isAlreadyLiked =
    //       (await this.createQueryBuilder("view")
    //         .leftJoin("view.views_post_fs", "fullscreenpost")
    //         .leftJoin("view.views_user", "users")
    //         .select()
    //         .where("users.useremail = :useremail", { useremail })
    //         .andWhere("fullscreenpost.fs_post_id = :fs_post_id", { fs_post_id })
    //         .getCount()) > 0;
    //     if (isAlreadyLiked) {
    //       return res.send({
    //         code: 403,
    //         data: "User is Already Liked",
    //         added: false,
    //       });
    //     }
    //     if (!isAlreadyLiked) {
    //       let userRepositiory = getCustomRepository(UserRepository);
    //       let user = await userRepositiory.findOne({ useremail });
    //       let postRepositiory = getCustomRepository(FullScreenPostRepository);
    //       let postfs = await postRepositiory.findOne({ fs_post_id });
    //       let likeEntity = new ViewsEntity();
    //       likeEntity.views_post_fs = postfs!;
    //       likeEntity.views_user = user!;
    //       await likeEntity
    //         .save()
    //         .then((data: any) => {
    //           if (data !== undefined) {
    //             return res.send({
    //               code: 201,
    //               data: "User is viewed",
    //               added: true,
    //             });
    //           }
    //         })
    //         .catch((error: any) => {
    //           if (error) {
    //             return res.send({
    //               code: 402,
    //               data: "something went wrong",
    //               added: false,
    //             });
    //           }
    //         });
    //     }
    //   }
    checkuserView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { useremail, blog_id } = req.params;
                var isAlreadyLiked = (yield this.createQueryBuilder("view")
                    .leftJoin("view.view_post", "blogs")
                    .leftJoin("view.views_user", "users")
                    .select("view.view_id")
                    .where("users.useremail = :useremail", { useremail })
                    .andWhere("blogs.blog_id = :blog_id", { blog_id })
                    .getCount()) > 0;
                if (isAlreadyLiked) {
                    var islikeduser = yield this.createQueryBuilder("view")
                        .leftJoin("view.view_post", "blogs")
                        .leftJoin("view.views_user", "users")
                        .select("view.view_id")
                        .where("users.useremail = :useremail", { useremail })
                        .andWhere("blogs.blog_id = :blog_id", { blog_id })
                        .getOne();
                    res.send({
                        code: 201,
                        data: "User is viewed ",
                        message: islikeduser,
                        isViewed: true,
                    });
                }
                else {
                    return res.send({
                        code: 301,
                        data: "User is not viewed",
                        message: null,
                        isViewed: false,
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    fetchViews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let { blog_id } = req.params;
                let response = yield this.createQueryBuilder("view")
                    .leftJoin("view.view_post", "blogs")
                    .leftJoin("view.views_user", "users")
                    .select()
                    .where("blogs.blog_id = :blog_id", { blog_id })
                    .getMany();
                let data1 = response.length > 0;
                if (!data1) {
                    return res.send({
                        code: 204,
                        recivied: false,
                        data: response,
                    });
                }
                else {
                    return res.send({
                        code: 201,
                        recivied: true,
                        data: response,
                    });
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    //! post
    addViewspost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail, blog_id } = req.body;
            var isAlreadyLiked = (yield this.createQueryBuilder("view")
                .leftJoin("view.view_post", "blogs")
                .leftJoin("view.views_user", "users")
                .select()
                .where("users.useremail = :useremail", { useremail })
                .andWhere("blogs.blog_id = :blog_id", { blog_id })
                .getCount()) > 0;
            if (isAlreadyLiked) {
                return res.send({
                    code: 403,
                    data: "User is Already Viewed",
                    added: false,
                });
            }
            if (!isAlreadyLiked) {
                let userRepositiory = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                let user = yield userRepositiory.findOneBy({ useremail });
                let postRepositiory = (0, typeorm_1.getCustomRepository)(blogs_repository_1.BlogRepository);
                let postfs = yield postRepositiory.findOneBy({ blog_id });
                let likeEntity = new view_entity_1.ViewsEntity();
                likeEntity.view_post = postfs;
                likeEntity.views_user = user;
                yield likeEntity
                    .save()
                    .then((data) => {
                    if (data != undefined) {
                        return res.send({
                            code: 201,
                            data: "User is Viewed",
                            added: true,
                        });
                    }
                    else {
                        return res.send({
                            code: 301,
                            data: "User is not Viewed",
                            added: true,
                        });
                    }
                })
                    .catch((error) => {
                    if (error) {
                        return res.send({
                            code: 402,
                            data: "something went wrong",
                            added: false,
                        });
                    }
                });
            }
        });
    }
};
ViewsRepository = __decorate([
    (0, typeorm_1.EntityRepository)(view_entity_1.ViewsEntity)
], ViewsRepository);
exports.ViewsRepository = ViewsRepository;
