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
exports.UserEntity = void 0;
const typeorm_1 = require("typeorm");
const bookmark_entity_1 = require("../bookmark/entity/bookmark.entity");
const contactus_entity_1 = require("../contactus/enitiy/contactus.entity");
const forgotpassword_entity_1 = require("../forgotpassword/entity/forgotpassword.entity");
const view_entity_1 = require("../views/entity/view.entity");
let UserEntity = class UserEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", String)
], UserEntity.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "useremail", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "username", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], UserEntity.prototype, "userpassword", void 0);
__decorate([
    (0, typeorm_1.OneToOne)(() => forgotpassword_entity_1.ForgotPasswordEntity, (forgotpassword) => forgotpassword.user),
    __metadata("design:type", forgotpassword_entity_1.ForgotPasswordEntity)
], UserEntity.prototype, "forgotpassword", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => bookmark_entity_1.BookmarkBlogEntity, (user_bookmarks) => user_bookmarks.bookmark_user),
    __metadata("design:type", bookmark_entity_1.BookmarkBlogEntity)
], UserEntity.prototype, "user_bookmarks", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => view_entity_1.ViewsEntity, (user_views) => user_views.views_user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], UserEntity.prototype, "user_views", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => contactus_entity_1.ContactusEntity, (contactus) => contactus.log_user),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", Array)
], UserEntity.prototype, "contactus", void 0);
UserEntity = __decorate([
    (0, typeorm_1.Entity)("users")
], UserEntity);
exports.UserEntity = UserEntity;
