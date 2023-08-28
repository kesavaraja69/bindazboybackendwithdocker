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
exports.AudiobookchapterRepository = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
const audiochapter_entity_1 = require("../entity/audiochapter.entity");
const typeorm_1 = require("typeorm");
const audiobook_repository_1 = require("../../audiobooks/repositry/audiobook.repository");
dotenv_1.default.config();
let AudiobookchapterRepository = class AudiobookchapterRepository extends typeorm_1.Repository {
    addaudiobookchapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            if (admin_token === admin_secrect) {
                let { audiobookchapter_title, audiobookchapter_description, audiobookchapter_audiourl, audiobook_id, } = req.body;
                let catergoryrepo = (0, typeorm_1.getCustomRepository)(audiobook_repository_1.AudioBookRepository);
                let parent_catergory = yield catergoryrepo.findOneBy({
                    audiobook_id,
                });
                yield this.createQueryBuilder('audiobookschapter')
                    .insert()
                    .values({
                    audiobookchapter_title,
                    audiobookchapter_description,
                    audiobookchapter_audiourl,
                    audiobooks: parent_catergory,
                })
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
    fetchaudiochapter(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sub_service = yield this.createQueryBuilder('audiobookschapter')
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
    fetchaudiochapterwithaudio(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { audioid, audiochapterid } = req.params;
            try {
                let sub_service = yield this.createQueryBuilder('audiobookschapter')
                    .leftJoinAndSelect('audiobookschapter.audiobooks', 'audiobooks')
                    .select()
                    .where('audiobooks.audiobook_id = :audioid', { audioid })
                    .andWhere('audiobookschapter.audiobookchapter_id = :audiochapterid', {
                    audiochapterid,
                })
                    .getOne();
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
AudiobookchapterRepository = __decorate([
    (0, typeorm_1.EntityRepository)(audiochapter_entity_1.AudiobookchapterEntity)
], AudiobookchapterRepository);
exports.AudiobookchapterRepository = AudiobookchapterRepository;
