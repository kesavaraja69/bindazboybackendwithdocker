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
exports.AudioBookRepository = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const audiobook_entity_1 = require("../entity/audiobook.entity");
dotenv_1.default.config();
let AudioBookRepository = class AudioBookRepository extends typeorm_1.Repository {
    addaudiobook(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            if (admin_token === admin_secrect) {
                let { audiobook_title, audiobook_description, audiobook_imagecover, audiobook_author, audiobook_date, } = req.body;
                let audiobookenity = new audiobook_entity_1.AudiobookEntity();
                audiobookenity.audiobook_title = audiobook_title;
                audiobookenity.audiobook_description = audiobook_description;
                audiobookenity.audiobook_imagecover = audiobook_imagecover;
                audiobookenity.audiobook_author = audiobook_author;
                audiobookenity.audiobook_date = audiobook_date;
                yield audiobookenity
                    .save()
                    .then((data) => {
                    return res.send({
                        code: 201,
                        message: "audiobook Added Sucessfully",
                        submitted: true,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 401,
                        message: null,
                        submitted: false,
                    });
                });
            }
            else {
                return res.send({
                    code: 409,
                    message: "your not admin",
                    submitted: false,
                });
            }
        });
    }
    fetchaudiobookwithchapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { audioid } = req.params;
            let blogsaudiochapter = yield this.createQueryBuilder("audiobooks")
                .leftJoinAndSelect("audiobooks.audiochapter", "audiobookschapter")
                .select()
                .orderBy("audiobooks.audiobook_id", "DESC")
                .where("audiobooks.audiobook_id = :audioid", { audioid })
                .getOne();
            try {
                if (blogsaudiochapter !== undefined) {
                    return res.send({
                        received: true,
                        data: blogsaudiochapter,
                        message: "blog detail recived",
                        code: 200,
                    });
                }
                else {
                    return res.send({
                        received: false,
                        data: null,
                        message: "no blogs add please",
                        code: 402,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        received: false,
                        data: null,
                        message: "something went wrong",
                        code: 403,
                    });
                }
            }
        });
    }
    fetchaudiobooks(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogsaudiobooks = yield this.createQueryBuilder("audiobooks")
                .select()
                .orderBy("audiobooks.audiobook_id", "DESC")
                .getMany();
            try {
                if (blogsaudiobooks !== undefined) {
                    return res.send({
                        received: true,
                        data: blogsaudiobooks,
                        message: "blogs recived",
                        code: 200,
                    });
                }
                else {
                    return res.send({
                        received: true,
                        data: null,
                        message: "no blogs add please",
                        code: 402,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        received: false,
                        data: null,
                        message: "something went wrong",
                        code: 403,
                    });
                }
            }
        });
    }
};
AudioBookRepository = __decorate([
    (0, typeorm_1.EntityRepository)(audiobook_entity_1.AudiobookEntity)
], AudioBookRepository);
exports.AudioBookRepository = AudioBookRepository;
