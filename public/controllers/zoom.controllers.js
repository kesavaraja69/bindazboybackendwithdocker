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
exports.ZoomsController = void 0;
const typeorm_1 = require("typeorm");
const zoom_repo_1 = require("../database/zoom/repo/zoom.repo");
const zoomuser_repo_1 = require("../database/zoom/repo/zoomuser.repo");
class ZoomsController {
    //! zoom
    static addZoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomsRepository = (0, typeorm_1.getCustomRepository)(zoom_repo_1.ZoomRepository);
            yield zoomsRepository.submitZoomData(req, res);
        });
    }
    static fetchZoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomsRepository = (0, typeorm_1.getCustomRepository)(zoom_repo_1.ZoomRepository);
            yield zoomsRepository.fetchZoomdetails(req, res);
        });
    }
    static updatezoomSlot(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomsRepository = (0, typeorm_1.getCustomRepository)(zoom_repo_1.ZoomRepository);
            yield zoomsRepository.updateZoomAvailableSlot(req, res);
        });
    }
    static updatezoom(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomsRepository = (0, typeorm_1.getCustomRepository)(zoom_repo_1.ZoomRepository);
            yield zoomsRepository.updateZoom(req, res);
        });
    }
    static updatezoomdate(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomsRepository = (0, typeorm_1.getCustomRepository)(zoom_repo_1.ZoomRepository);
            yield zoomsRepository.updateZoomdate(req, res);
        });
    }
    static updateZoomIsenable(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomsRepository = (0, typeorm_1.getCustomRepository)(zoom_repo_1.ZoomRepository);
            yield zoomsRepository.updateZoomIsenable(req, res);
        });
    }
    //! zoom user
    static addZoomuser(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomUserRepository = (0, typeorm_1.getCustomRepository)(zoomuser_repo_1.ZoomUserRepository);
            yield zoomUserRepository.registerUserZoomData(req, res);
        });
    }
    static fetchallUserData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomUserRepository = (0, typeorm_1.getCustomRepository)(zoomuser_repo_1.ZoomUserRepository);
            yield zoomUserRepository.fetchallUserData(req, res);
        });
    }
    static checkUserZoomData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomUserRepository = (0, typeorm_1.getCustomRepository)(zoomuser_repo_1.ZoomUserRepository);
            yield zoomUserRepository.checkUserZoomData(req, res);
        });
    }
    static removeAllUserZoomData(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let zoomUserRepository = (0, typeorm_1.getCustomRepository)(zoomuser_repo_1.ZoomUserRepository);
            yield zoomUserRepository.removeAllUserZoomData(req, res);
        });
    }
}
exports.ZoomsController = ZoomsController;
