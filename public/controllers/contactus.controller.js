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
exports.ContactusContoller = void 0;
const typeorm_1 = require("typeorm");
const contactus_repo_1 = require("../database/contactus/repo/contactus.repo");
class ContactusContoller {
    static adduserreportandcontactus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let contactusrep = (0, typeorm_1.getCustomRepository)(contactus_repo_1.ContactusRepository);
            yield contactusrep.adduserreportandcontactus(req, res);
        });
    }
    static fetchuserreportandcontactus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let contactusrep = (0, typeorm_1.getCustomRepository)(contactus_repo_1.ContactusRepository);
            yield contactusrep.fetchuserreportandcontactus(req, res);
        });
    }
    static fetchuserreportorcontactus(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let contactusrep = (0, typeorm_1.getCustomRepository)(contactus_repo_1.ContactusRepository);
            yield contactusrep.fetchuserreportorcontactus(req, res);
        });
    }
}
exports.ContactusContoller = ContactusContoller;
