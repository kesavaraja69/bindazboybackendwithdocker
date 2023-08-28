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
exports.ViewController = void 0;
const typeorm_1 = require("typeorm");
const view_repo_1 = require("../database/views/repo/view.repo");
class ViewController {
    static addViews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let viewRepository = (0, typeorm_1.getCustomRepository)(view_repo_1.ViewsRepository);
            yield viewRepository.addViewspost(req, res);
        });
    }
    static fetchViews(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let viewRepository = (0, typeorm_1.getCustomRepository)(view_repo_1.ViewsRepository);
            yield viewRepository.fetchViews(req, res);
        });
    }
    static checkuserView(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let viewRepository = (0, typeorm_1.getCustomRepository)(view_repo_1.ViewsRepository);
            yield viewRepository.checkuserView(req, res);
        });
    }
}
exports.ViewController = ViewController;
