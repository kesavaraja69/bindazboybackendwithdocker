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
exports.AuthenticationController = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const EmailValidater = __importStar(require("email-validator"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const typeorm_1 = require("typeorm");
const user_repository_1 = require("../database/repository/user.repository");
dotenv_1.default.config();
class AuthenticationController {
    static fetchusers(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
            yield userRepository.fetchUsers(req, res);
        });
    }
    static createNewAccount(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail, username, userpassword } = req.body;
            let isValidated = EmailValidater.validate(useremail);
            if (!isValidated) {
                return res.send({
                    user: null,
                    authentication: 'false',
                    message: 'Invalid Email',
                    code: 403,
                });
            }
            let isExiting = (yield (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository)
                .createQueryBuilder('users')
                .select()
                .where('users.useremail = :useremail', { useremail })
                .getCount()) > 0;
            if (isExiting) {
                return res.send({
                    user: null,
                    message: 'user is already exsiting',
                    authenticated: false,
                    code: 400,
                });
            }
            else {
                let salt = yield bcrypt_1.default.genSalt(10);
                bcrypt_1.default.hash(userpassword, salt, (error, hashedpassword) => __awaiter(this, void 0, void 0, function* () {
                    if (error) {
                        return res.send({
                            user: null,
                            authentication: 'false',
                            message: 'something went wrong',
                            code: 400,
                        });
                    }
                    console.log(hashedpassword);
                    let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                    yield userRepository.submitUserData(req, res, hashedpassword);
                    yield AuthenticationController.createjwt(useremail, res);
                }));
            }
        });
    }
    static login(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail, userpassword } = req.body;
            let isValidated = EmailValidater.validate(useremail);
            try {
                if (!isValidated) {
                    return res.send({
                        user: null,
                        authentication: 'false',
                        message: 'Invalid Email',
                        code: 403,
                    });
                }
                let userRepository = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                let checkuser = yield userRepository.findUser(useremail, res);
                if (checkuser === undefined) {
                    return res.send({
                        authentication: false,
                        message: 'User not Found',
                        code: 404,
                    });
                }
                else {
                    let oldPassword = (yield userRepository.findUserPassword(useremail, res));
                    bcrypt_1.default.compare(userpassword, oldPassword, (error, isMatched) => __awaiter(this, void 0, void 0, function* () {
                        if (error) {
                            return res.send({
                                user: null,
                                authentication: 'false',
                                message: 'Something went wrong, try again',
                                code: 401,
                            });
                        }
                        if (!isMatched) {
                            return res.send({
                                user: null,
                                authentication: 'false',
                                message: 'wrong password',
                                code: 409,
                            });
                        }
                        else {
                            return yield AuthenticationController.createjwt(useremail, res);
                        }
                    }));
                }
            }
            catch (error) {
                console.log(error);
            }
        });
    }
    static decodejwt(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let token = req.headers.authorization;
            let jwt_secrect = process.env.JWT_SECRECT;
            jsonwebtoken_1.default.verify(token, jwt_secrect, (error, data) => {
                if (error) {
                    return res.send({
                        authentication: 'false',
                        message: 'Somthing went wrong',
                        code: 402,
                    });
                }
                else {
                    let useremail = data.useremail;
                    return res.send({
                        authentication: 'true',
                        message: useremail,
                    });
                }
            });
        });
    }
}
exports.AuthenticationController = AuthenticationController;
_a = AuthenticationController;
AuthenticationController.createjwt = (payload, res) => __awaiter(void 0, void 0, void 0, function* () {
    let jwt_secrect = process.env.JWT_SECRECT;
    jsonwebtoken_1.default.sign({
        payload,
    }, jwt_secrect, {
        expiresIn: '1hr',
    }, (error, jwtdata) => {
        if (error) {
            return res.send({
                authentication: 'false',
                message: 'Somthing went wrong',
                code: 402,
            });
        }
        return res.send({
            user: payload,
            authentication: 'true',
            message: jwtdata,
            code: 201,
        });
    });
});
