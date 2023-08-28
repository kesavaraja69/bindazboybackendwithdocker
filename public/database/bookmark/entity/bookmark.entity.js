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
exports.BookmarkBlogEntity = void 0;
const typeorm_1 = require("typeorm");
const blogs_entity_1 = require("../../blogs/entity/blogs.entity");
const user_entity_1 = require("../../entity/user.entity");
let BookmarkBlogEntity = class BookmarkBlogEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], BookmarkBlogEntity.prototype, "bookmark_id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => blogs_entity_1.BlogEntity, (bookmark_blogdata) => bookmark_blogdata.blog),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", blogs_entity_1.BlogEntity)
], BookmarkBlogEntity.prototype, "bookmark_blogdata", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (bookmark_user) => bookmark_user.user_bookmarks),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", user_entity_1.UserEntity)
], BookmarkBlogEntity.prototype, "bookmark_user", void 0);
BookmarkBlogEntity = __decorate([
    (0, typeorm_1.Entity)("bookmark_blog")
], BookmarkBlogEntity);
exports.BookmarkBlogEntity = BookmarkBlogEntity;
