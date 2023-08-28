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
exports.ZoomUserEntity = void 0;
const typeorm_1 = require("typeorm");
const zoom_entity_1 = require("./zoom.entity");
let ZoomUserEntity = class ZoomUserEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ZoomUserEntity.prototype, "zoomUserId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ZoomUserEntity.prototype, "user_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], ZoomUserEntity.prototype, "zoomMeetUser", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], ZoomUserEntity.prototype, "zoomMeetUserEmail", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => zoom_entity_1.ZoomEntity, (zoomdt) => zoomdt.zoomusers),
    (0, typeorm_1.JoinColumn)(),
    __metadata("design:type", zoom_entity_1.ZoomEntity)
], ZoomUserEntity.prototype, "zoomdt", void 0);
ZoomUserEntity = __decorate([
    (0, typeorm_1.Entity)('userzoom')
], ZoomUserEntity);
exports.ZoomUserEntity = ZoomUserEntity;
