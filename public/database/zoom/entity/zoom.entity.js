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
exports.ZoomEntity = void 0;
const typeorm_1 = require("typeorm");
const zoomuser_entity_1 = require("./zoomuser.entity");
let ZoomEntity = class ZoomEntity extends typeorm_1.BaseEntity {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], ZoomEntity.prototype, "zoomId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        type: 'timestamp',
        default: () => 'CURRENT_TIMESTAMP(6)',
        nullable: false,
    }),
    __metadata("design:type", Date)
], ZoomEntity.prototype, "regsiter_date", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], ZoomEntity.prototype, "zoomMeetId", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ZoomEntity.prototype, "zoomMeetIsEnable", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ZoomEntity.prototype, "zoomMeetTopic", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], ZoomEntity.prototype, "zoomMeetPassword", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ZoomEntity.prototype, "zoommeetdateandtime", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", String)
], ZoomEntity.prototype, "zoommeetupcomingdate", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: true,
    }),
    __metadata("design:type", Number)
], ZoomEntity.prototype, "zoom_Available_Slots", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", Number)
], ZoomEntity.prototype, "zoom_Total_Slots", void 0);
__decorate([
    (0, typeorm_1.Column)({
        nullable: false,
    }),
    __metadata("design:type", String)
], ZoomEntity.prototype, "zoommeetURL", void 0);
__decorate([
    (0, typeorm_1.OneToMany)(() => zoomuser_entity_1.ZoomUserEntity, (zoomusers) => zoomusers.zoomdt),
    __metadata("design:type", Array)
], ZoomEntity.prototype, "zoomusers", void 0);
ZoomEntity = __decorate([
    (0, typeorm_1.Entity)('zoom')
], ZoomEntity);
exports.ZoomEntity = ZoomEntity;
