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
exports.CategoryController = void 0;
const typeorm_1 = require("typeorm");
const category_repository_1 = require("../database/category/repo/category.repository");
class CategoryController {
    static addCategory(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryRepository = (0, typeorm_1.getCustomRepository)(category_repository_1.CategoryRepository);
            yield categoryRepository.addCategory(req, res);
        });
    }
    static fetchCategorys(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryRepository = (0, typeorm_1.getCustomRepository)(category_repository_1.CategoryRepository);
            yield categoryRepository.fetchCategorys(req, res);
        });
    }
    static fetchCategoryblogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryRepository = (0, typeorm_1.getCustomRepository)(category_repository_1.CategoryRepository);
            yield categoryRepository.fetchCategoryblogs(req, res);
        });
    }
    static fetchCategoryblogswithlimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoryRepository = (0, typeorm_1.getCustomRepository)(category_repository_1.CategoryRepository);
            yield categoryRepository.fetchCategoryblogswithlimit(req, res);
        });
    }
}
exports.CategoryController = CategoryController;
