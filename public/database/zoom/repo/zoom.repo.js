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
exports.ZoomRepository = void 0;
const EntityRepository_1 = require("typeorm/decorator/EntityRepository");
const zoom_entity_1 = require("../entity/zoom.entity");
const Repository_1 = require("typeorm/repository/Repository");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let ZoomRepository = class ZoomRepository extends Repository_1.Repository {
    submitZoomData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { zoomMeetId, zoomMeetPassword, zoommeetdateandtime, zoom_Available_Slots, zoom_Total_Slots, zoommeetURL, zoomMeetTopic, } = req.body;
            yield this.createQueryBuilder('zoom')
                .insert()
                .values({
                zoomMeetId,
                zoomMeetPassword,
                zoommeetdateandtime,
                zoom_Available_Slots,
                zoom_Total_Slots,
                zoommeetURL,
                zoomMeetTopic,
            })
                .execute()
                .then((data) => {
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        submitted: true,
                        message: ' added Success',
                    });
                }
                else {
                    return res.send({
                        code: 301,
                        submitted: true,
                        message: ' not added ',
                    });
                }
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
        });
    }
    fetchZoomdetails(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let sub_data = yield this.createQueryBuilder('zoom').select().getOne();
                //  console.log(sub_data);
                const JSON_string = JSON.stringify({ sub_data });
                // console.log(JSON_string);
                let JSobjdata = JSON.parse(JSON_string);
                console.log(JSobjdata.sub_data.zoomId);
                if (sub_data !== undefined &&
                    JSobjdata.sub_data.zoomMeetIsEnable != null) {
                    return res.send({
                        data: sub_data,
                        code: 201,
                        received: true,
                    });
                }
                else {
                    //!  undo  sub_data !== undefined
                    return res.send({
                        data: null,
                        code: 301,
                        received: false,
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
    //! update zoom in database
    updateZoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            let { zoomId } = req.params;
            let { zoomMeetId, zoomMeetPassword, zoommeetdateandtime, zoom_Available_Slots, zoom_Total_Slots, zoommeetURL, zoomMeetTopic, zoommeetupcomingdate, } = req.body;
            if (admin_token === admin_secrect) {
                yield this.createQueryBuilder()
                    .update(zoom_entity_1.ZoomEntity)
                    .set({
                    zoomMeetId,
                    zoomMeetPassword,
                    zoommeetdateandtime,
                    zoom_Available_Slots,
                    zoom_Total_Slots,
                    zoommeetURL,
                    zoomMeetTopic,
                    zoommeetupcomingdate,
                })
                    .where('zoomId = :zoomId', { zoomId })
                    .execute()
                    .then((data) => {
                    //  console.log(data);
                    if (data !== undefined) {
                        return res.send({
                            code: 201,
                            message: 'zoom updated Sucessfully',
                            submitted: true,
                        });
                    }
                    else {
                        return res.send({
                            code: 301,
                            message: 'zoom not updated ',
                            submitted: true,
                        });
                    }
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 402,
                        message: 'zoom update went wrong',
                        submitted: false,
                    });
                });
            }
        });
    }
    //! update zoom Available slot in database
    updateZoomAvailableSlot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { zoomId } = req.params;
            let { zoom_Available_Slots } = req.body;
            yield this.createQueryBuilder()
                .update(zoom_entity_1.ZoomEntity)
                .set({
                zoom_Available_Slots,
            })
                .where('zoomId = :zoomId', { zoomId })
                .execute()
                .then((data) => {
                //  console.log(data);
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        message: 'zoom slot updated Sucessfully',
                        submitted: true,
                    });
                }
                else {
                    return res.send({
                        code: 302,
                        message: 'zoom slot not updated ',
                        submitted: false,
                    });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.send({
                    code: 401,
                    message: 'zoom slot went wrong',
                    submitted: false,
                });
            });
        });
    }
    //! update zoom is Enable or not in database
    updateZoomIsenable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { zoomId } = req.params;
            let { zoomMeetIsEnable } = req.body;
            yield this.createQueryBuilder()
                .update(zoom_entity_1.ZoomEntity)
                .set({
                zoomMeetIsEnable,
            })
                .where('zoomId = :zoomId', { zoomId })
                .execute()
                .then((data) => {
                //  console.log(data);
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        message: 'zoom enable updated Sucessfully',
                        submitted: true,
                    });
                }
                else {
                    return res.send({
                        code: 302,
                        message: 'zoom enable not updated ',
                        submitted: false,
                    });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.send({
                    code: 401,
                    message: 'zoom enable went wrong',
                    submitted: false,
                });
            });
        });
    }
    //! update zoom date in database
    updateZoomdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { zoomId } = req.params;
            let { zoommeetupcomingdate } = req.body;
            yield this.createQueryBuilder()
                .update(zoom_entity_1.ZoomEntity)
                .set({
                zoommeetupcomingdate,
            })
                .where('zoomId = :zoomId', { zoomId })
                .execute()
                .then((data) => {
                //  console.log(data);
                if (data !== undefined) {
                    return res.send({
                        code: 201,
                        message: 'zoom slot updated Sucessfully',
                        submitted: true,
                    });
                }
                else {
                    return res.send({
                        code: 302,
                        message: 'zoom slot not updated ',
                        submitted: false,
                    });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.send({
                    code: 401,
                    message: 'zoom slot went wrong',
                    submitted: false,
                });
            });
        });
    }
};
ZoomRepository = __decorate([
    (0, EntityRepository_1.EntityRepository)(zoom_entity_1.ZoomEntity)
], ZoomRepository);
exports.ZoomRepository = ZoomRepository;
