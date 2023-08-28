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
exports.CategoryRepository = void 0;
const typeorm_1 = require("typeorm");
const category_entity_1 = require("../entity/category.entity");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let CategoryRepository = class CategoryRepository extends typeorm_1.Repository {
    addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            //let { blog_id } = req.params;
            if (admin_token === admin_secrect) {
                let { catergory_title } = req.body;
                yield this.createQueryBuilder('catergory')
                    .insert()
                    .values({ catergory_title })
                    .execute()
                    .then((data) => {
                    return res.send({
                        code: 201,
                        submitted: true,
                        message: 'Catergroy added under database!',
                    });
                })
                    .catch((error) => {
                    if (error) {
                        return res.send({
                            code: 402,
                            submitted: false,
                            message: 'Something went wrong, Try again!',
                        });
                    }
                });
            }
            else {
                return res.send({
                    code: 401,
                    message: 'your not admin',
                    submitted: false,
                });
            }
        });
    }
    fetchCategoryblogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { catergory_title } = req.params;
            try {
                let sub_service = yield this.createQueryBuilder('catergory')
                    .leftJoinAndSelect('catergory.blogs', 'blogs')
                    .where('catergory.catergory_title = :catergory_title', {
                    catergory_title,
                })
                    .getMany();
                if (sub_service !== undefined) {
                    return res.send({
                        data: sub_service,
                        code: 200,
                        received: true,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        data: null,
                        code: 401,
                        received: false,
                    });
                }
            }
        });
    }
    fetchCategoryblogswithlimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let peritem = 9;
            let { catergory_title, pageno } = req.params;
            try {
                let sub_service = yield this.createQueryBuilder('catergory')
                    .leftJoinAndSelect('catergory.blogs', 'blogs')
                    .where('catergory.catergory_title = :catergory_title', {
                    catergory_title,
                })
                    .offset((parseInt(pageno) - 1) * peritem)
                    .limit(peritem)
                    .getMany();
                if (sub_service !== undefined) {
                    return res.send({
                        data: sub_service,
                        code: 200,
                        received: true,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        data: null,
                        code: 401,
                        received: false,
                    });
                }
            }
        });
    }
    fetchCategorys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            /*
                1.Code : Status code
                2.Data : Error/Actual data
                3.Submitted : Boolean for submission (true/false)
            */
            // let { blogs_cat_id } = req.params;
            try {
                let sub_service = yield this.createQueryBuilder('catergory')
                    .select()
                    .getMany();
                if (sub_service !== undefined) {
                    return res.send({
                        data: sub_service,
                        code: 200,
                        received: true,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        data: null,
                        code: 401,
                        received: false,
                    });
                }
            }
        });
    }
};
CategoryRepository = __decorate([
    (0, typeorm_1.EntityRepository)(category_entity_1.CatergoryEntity)
], CategoryRepository);
exports.CategoryRepository = CategoryRepository;
