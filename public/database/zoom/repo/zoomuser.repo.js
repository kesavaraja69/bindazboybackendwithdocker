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
exports.ZoomUserRepository = void 0;
const EntityRepository_1 = require("typeorm/decorator/EntityRepository");
const zoomuser_entity_1 = require("../entity/zoomuser.entity");
const typeorm_1 = require("typeorm");
const zoom_repo_1 = require("./zoom.repo");
let ZoomUserRepository = class ZoomUserRepository extends typeorm_1.Repository {
    registerUserZoomData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { zoomMeetUser, zoomMeetUserEmail, zoomId, zoomdate } = req.body;
            const now = new Date();
            let zoomrepo = (0, typeorm_1.getCustomRepository)(zoom_repo_1.ZoomRepository);
            let parent_zoom = yield zoomrepo.findOneBy({ zoomId });
            let isExiting = (yield this.createQueryBuilder('userzoom')
                .select()
                .where('userzoom.zoomMeetUserEmail = :zoomMeetUserEmail', {
                zoomMeetUserEmail,
            })
                .getCount()) > 0;
            if (isExiting) {
                res.send({
                    message: 'user alright exists',
                    authentication: false,
                    code: 400,
                });
            }
            else {
                let zoomUserEntity = new zoomuser_entity_1.ZoomUserEntity();
                zoomUserEntity.zoomMeetUser = zoomMeetUser;
                zoomUserEntity.zoomMeetUserEmail = zoomMeetUserEmail;
                zoomUserEntity.zoomdt = parent_zoom;
                zoomUserEntity.user_date = zoomdate;
                if (parent_zoom !== undefined) {
                    yield zoomUserEntity
                        .save()
                        .then((data) => __awaiter(this, void 0, void 0, function* () {
                        if (data !== undefined) {
                            return res.send({
                                code: 201,
                                submitted: true,
                                message: ' added user zoom Success',
                            });
                        }
                        else {
                            return res.send({
                                code: 301,
                                submitted: true,
                                message: 'Not Added ',
                            });
                        }
                    }))
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
                        code: 403,
                        submitted: false,
                        message: 'No Zoom Meeting Available',
                    });
                }
            }
        });
    }
    fetchallUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createQueryBuilder('userzoom')
                .select()
                .getMany()
                .then((data) => {
                if (data !== undefined) {
                    res.send({
                        message: 'user data found',
                        data: data,
                        code: 201,
                    });
                }
                else {
                    res.send({
                        message: 'user data not found',
                        data: null,
                        code: 301,
                    });
                }
            })
                .catch((error) => {
                if (error) {
                    return res.send({
                        code: 402,
                        data: null,
                        message: 'Something went wrong, Try again!',
                    });
                }
            });
        });
    }
    checkUserZoomData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { zoomMeetUserEmail } = req.params;
            yield this.createQueryBuilder('userzoom')
                .select()
                .where('userzoom.zoomMeetUserEmail = :zoomMeetUserEmail', {
                zoomMeetUserEmail,
            })
                .getOne()
                .then((data) => {
                if (data !== undefined) {
                    res.send({
                        message: 'user alright exists',
                        isUser: true,
                        data: data,
                        code: 201,
                    });
                }
                else {
                    res.send({
                        message: 'user not found',
                        isUser: false,
                        data: null,
                        code: 301,
                    });
                }
            })
                .catch((error) => {
                if (error) {
                    return res.send({
                        code: 402,
                        isUser: false,
                        data: null,
                        message: 'Something went wrong, Try again!',
                    });
                }
            });
        });
    }
    removeAllUserZoomData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this.createQueryBuilder('userzoom')
                .select()
                .delete()
                .execute()
                .then((data) => {
                // console.log(data);
                var isAffected = data.affected;
                if (isAffected > 0) {
                    res.send({
                        message: 'user All Removed',
                        code: 201,
                    });
                }
                else {
                    res.send({
                        message: 'user not Removed',
                        code: 301,
                    });
                }
            })
                .catch((error) => {
                if (error) {
                    return res.send({
                        code: 402,
                        message: 'Something went wrong, Try again!',
                    });
                }
            });
        });
    }
};
ZoomUserRepository = __decorate([
    (0, EntityRepository_1.EntityRepository)(zoomuser_entity_1.ZoomUserEntity)
], ZoomUserRepository);
exports.ZoomUserRepository = ZoomUserRepository;
