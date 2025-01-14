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
exports.ViewsEntity = void 0;
const typeorm_1 = require("typeorm");
const blogs_entity_1 = require("../../blogs/entity/blogs.entity");
const user_entity_1 = require("../../entity/user.entity");
let ViewsEntity = class ViewsEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ViewsEntity.prototype, "view_id", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: "timestamp",
        default: () => "CURRENT_TIMESTAMP(6)",
        nullable: false,
    }),
    __metadata("design:type", Date)
], ViewsEntity.prototype, "view_date", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => blogs_entity_1.BlogEntity, (view_post) => view_post.blog_views, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", blogs_entity_1.BlogEntity)
], ViewsEntity.prototype, "view_post", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.UserEntity, (views_user) => views_user.user_views, {
        onDelete: "CASCADE",
        onUpdate: "CASCADE",
    }),
    __metadata("design:type", user_entity_1.UserEntity)
], ViewsEntity.prototype, "views_user", void 0);
ViewsEntity = __decorate([
    (0, typeorm_1.Entity)("view")
], ViewsEntity);
exports.ViewsEntity = ViewsEntity;
