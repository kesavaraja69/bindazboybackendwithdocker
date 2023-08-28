"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.AdminRepository = void 0;
const typeorm_1 = require("typeorm");
const admin_entity_1 = require("../entity/admin.entity");
let AdminRepository = class AdminRepository extends typeorm_1.Repository {
    sumbitAdmin(req, res, haspassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let { admin_email } = req.body;
            let isAdminDuplicated = (yield this.createQueryBuilder("admin")
                .select()
                .where("admin.admin_email = :admin_email", { admin_email })
                .getCount()) > 0;
            if (isAdminDuplicated) {
                res.send({
                    message: "Admin is Already exists",
                    code: 405,
                });
            }
            if (!isAdminDuplicated) {
                yield this.createQueryBuilder("admin")
                    .insert()
                    .values({
                    admin_email,
                    admin_password: haspassword,
                })
                    .execute()
                    .then((data) => {
                    if (data != undefined) {
                        return true;
                    }
                })
                    .catch((error) => {
                    if (error) {
                        return false;
                    }
                });
            }
            return true;
        });
    }
    findAdmindata(admin_email) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseadmin = this.createQueryBuilder("admin")
                .select()
                .where("admin.admin_email = :admin_email", { admin_email })
                .getOne();
            return baseadmin;
        });
    }
};
AdminRepository = __decorate([
    (0, typeorm_1.EntityRepository)(admin_entity_1.AdminEntity)
], AdminRepository);
exports.AdminRepository = AdminRepository;
