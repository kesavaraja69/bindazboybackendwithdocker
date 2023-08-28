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
exports.BlogEntity = void 0;
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("../../bookmark/entity/bookmark.entity");
const category_entity_1 = require("../../category/entity/category.entity");
const view_entity_1 = require("../../views/entity/view.entity");
let BlogEntity = class BlogEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], BlogEntity.prototype, "blog_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "blog_title", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "blog_description", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "blog_image", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "blog_view", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "blog_category", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], BlogEntity.prototype, "blog_audio", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
        type: "simple-array"
    }),
    __metadata("design:type", Array)
], BlogEntity.prototype, "blog_images", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "date",
        nullable: true,
    }),
    __metadata("design:type", Date)
], BlogEntity.prototype, "blog_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => category_entity_1.CatergoryEntity, (catergorys) => catergorys.blogs),
    __metadata("design:type", category_entity_1.CatergoryEntity)
], BlogEntity.prototype, "catergorys", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.BookmarkBlogEntity, (blog) => blog.bookmark_blogdata),
    __metadata("design:type", bookmark_entity_1.BookmarkBlogEntity)
], BlogEntity.prototype, "blog", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => view_entity_1.ViewsEntity, (blog_views) => blog_views.view_post),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], BlogEntity.prototype, "blog_views", void 0);
BlogEntity = __decorate([
    (0, typeorm_1.Entity)("blogs")
], BlogEntity);
exports.BlogEntity = BlogEntity;
