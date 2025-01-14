"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CatergoryEntity = void 0;
const typeorm_1 = require("typeorm");
const blogs_entity_1 = require("../../blogs/entity/blogs.entity");
let CatergoryEntity = class CatergoryEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], CatergoryEntity.prototype, "catergory_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], CatergoryEntity.prototype, "catergory_title", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => blogs_entity_1.BlogEntity, (blogs) => blogs.catergorys),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], CatergoryEntity.prototype, "blogs", void 0);
CatergoryEntity = __decorate([
    (0, typeorm_1.Entity)("catergory")
], CatergoryEntity);
exports.CatergoryEntity = CatergoryEntity;
