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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserRepository = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../entity/user.entity");
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
let UserRepository = class UserRepository extends typeorm_1.Repository {
    fetchUsers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            if (admin_token === admin_secrect) {
                let users = yield this.createQueryBuilder('users').select().getMany();
                res.send({
                    users,
                });
            }
            else {
                res.send({
                    message: 'your not admin',
                });
            }
        });
    }
    submitUserData(req, res, hashedpassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail, username } = req.body;
            let isExiting = (yield this.createQueryBuilder('users')
                .select()
                .where('users.useremail = :useremail', { useremail })
                .getCount()) > 0;
            if (isExiting) {
                res.send({
                    message: 'user alright exists',
                    authentication: false,
                    code: 400,
                });
            }
            if (!isExiting) {
                this.createQueryBuilder('users')
                    .insert()
                    .values({
                    username,
                    useremail,
                    userpassword: hashedpassword,
                })
                    .execute();
            }
        });
    }
    findUserPassword(useremail, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseUser = yield this.createQueryBuilder('users')
                .select()
                .where('users.useremail = :useremail', { useremail })
                .getOne();
            if (baseUser === null) {
                res.send({
                    user: null,
                    message: 'account not found',
                    authenticated: false,
                    code: 402,
                });
            }
            else {
                let baseUserPassword = baseUser.userpassword;
                return baseUserPassword;
            }
        });
    }
    findUser(useremail, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let baseUser = yield this.createQueryBuilder('users')
                .select()
                .where('users.useremail = :useremail', { useremail })
                .getOne();
            return baseUser;
        });
    }
};
UserRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.UserEntity)
], UserRepository);
exports.UserRepository = UserRepository;
