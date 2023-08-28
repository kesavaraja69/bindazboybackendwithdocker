"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
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
var _a;
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminAuthenticationController = void 0;
const EmailValidator = __importStar(require("email-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const typeorm_1 = require("typeorm");
const admin_repository_1 = require("../database/admin/repo/admin.repository");
dotenv_1.default.config();
class AdminAuthenticationController {
    static signup(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { admin_email, admin_password } = req.body;
            let isValidated = EmailValidator.validate(admin_email);
            if (!isValidated) {
                return res.send({
                    user: null,
                    authentication: "false",
                    message: "Invalid Email",
                    code: 403,
                });
            }
            else {
                let isExiting = (yield (0, typeorm_1.getCustomRepository)(admin_repository_1.AdminRepository)
                    .createQueryBuilder("admin")
                    .select()
                    .where("admin.admin_email = :admin_email", { admin_email })
                    .getCount()) > 0;
                if (isExiting) {
                    return res.send({
                        user: null,
                        message: "admin is already exsiting",
                        authenticated: false,
                        code: 400,
                    });
                }
                else {
                    let salt = yield bcrypt_1.default.genSalt(10);
                    bcrypt_1.default.hash(admin_password, salt, (error, haspassword) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return res.send({
                                message: "Something went wrong",
                                code: 401,
                            });
                        }
                        if (haspassword != undefined) {
                            let adminrepo = (0, typeorm_1.getCustomRepository)(admin_repository_1.AdminRepository);
                            let adminAdded = yield adminrepo.sumbitAdmin(req, res, haspassword);
                            console.log(`Is Admin Added : ${adminAdded}`);
                            if (adminAdded) {
                                return yield AdminAuthenticationController.createjwt(admin_email, res);
                            }
                            if (!adminAdded) {
                                return res.send({
                                    message: "Admin not Added",
                                    code: 406,
                                });
                            }
                        }
                    }));
                }
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { admin_email, admin_password } = req.body;
            let isValidated = EmailValidator.validate(admin_email);
            if (!isValidated) {
                return res.send({
                    user: null,
                    authentication: "false",
                    message: "Invalid Email",
                    code: 403,
                });
            }
            else {
                let adminrepo = (0, typeorm_1.getCustomRepository)(admin_repository_1.AdminRepository);
                let baseuserdata = yield adminrepo.findAdmindata(admin_email);
                if (baseuserdata === undefined) {
                    return res.send({
                        message: "Admin is not found",
                        code: 404,
                    });
                }
                if (baseuserdata !== undefined) {
                    bcrypt_1.default.compare(admin_password, baseuserdata.admin_password, (error, isMatched) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return res.send({
                                message: "Something went wrong",
                                code: 401,
                            });
                        }
                        if (!isMatched) {
                            return res.send({
                                message: "Wrong Password",
                                code: 403,
                            });
                        }
                        else {
                            return yield AdminAuthenticationController.createjwt(admin_email, res);
                        }
                    }));
                }
            }
        });
    }
}
exports.AdminAuthenticationController = AdminAuthenticationController;
_a = AdminAuthenticationController;
AdminAuthenticationController.createjwt = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    let jwt_secrect = process.env.JWT_SECRECT;
    jsonwebtoken_1.default.sign({
        payload,
    }, jwt_secrect, {
        expiresIn: "1hr",
    }, (error, jwtdata) => {
        if (error) {
            return res.send({
                authentication: "false",
                message: "Somthing went wrong",
                code: 402,
            });
        }
        return res.send({
            user: payload,
            authentication: "true",
            message: jwtdata,
            code: 201,
        });
    });
});
