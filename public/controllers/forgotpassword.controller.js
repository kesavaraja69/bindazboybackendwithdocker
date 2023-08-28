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
Object.defineProperty(exports, "__esModule", { value: true });
exports.ForgotPassController = void 0;
const EmailValidater = __importStar(require("email-validator"));
const typeorm_1 = require("typeorm");
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const dotenv_1 = __importDefault(require("dotenv"));
const bcrypt_1 = __importDefault(require("bcrypt"));
const forgotpassword_repository_1 = require("../database/forgotpassword/repository/forgotpassword.repository");
dotenv_1.default.config();
class ForgotPassController {
    static createjwt(payload, secrect, res) {
        return __awaiter(this, void 0, void 0, function* () {
            jsonwebtoken_1.default.sign({ payload }, secrect, { expiresIn: '10m' }, (error, jwtdata) => {
                if (error) {
                    return res.send({
                        message: 'something went wrong',
                        code: 402,
                    });
                }
                return res.send({
                    message: jwtdata,
                    code: 201,
                });
            });
        });
    }
    static sendgridemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let forgotPasswordRepository = (0, typeorm_1.getCustomRepository)(forgotpassword_repository_1.ForgotPasswordRepository);
            // await forgotPasswordRepository.sendgridemailsend(req, res);
        });
    }
    static otpverfiycationemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let forgotPasswordRepository = (0, typeorm_1.getCustomRepository)(forgotpassword_repository_1.ForgotPasswordRepository);
            yield forgotPasswordRepository.otpverfiycationemail(req, res);
        });
    }
    static otpsendverfiycationemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let forgotPasswordRepository = (0, typeorm_1.getCustomRepository)(forgotpassword_repository_1.ForgotPasswordRepository);
            yield forgotPasswordRepository.otpsendverfiycationemail(req, res);
        });
    }
    static createNewLink(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail } = req.body;
            let isValidated = EmailValidater.validate(useremail);
            if (!isValidated) {
                return res.send({
                    message: 'inValid Email',
                    code: 403,
                });
            }
            let forgotPasswordRepository = (0, typeorm_1.getCustomRepository)(forgotpassword_repository_1.ForgotPasswordRepository);
            // await forgotPasswordRepository.userForgotPassword(useremail, res);
        });
    }
    static updatePassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { updateforgotPassword } = req.body;
            let salt = yield bcrypt_1.default.genSalt(10);
            bcrypt_1.default.hash(updateforgotPassword, salt, (error, hashedpassword) => __awaiter(this, void 0, void 0, function* () {
                if (error) {
                    return res.send({
                        user: null,
                        message: 'something went wrong',
                        code: 400,
                    });
                }
                console.log(hashedpassword);
                let forgotPasswordRepository = (0, typeorm_1.getCustomRepository)(forgotpassword_repository_1.ForgotPasswordRepository);
                forgotPasswordRepository.updatePassword(req, res, hashedpassword);
            }));
        });
    }
    static restForgotPassword(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail } = req.params;
            let forgotPasswordRepository = (0, typeorm_1.getCustomRepository)(forgotpassword_repository_1.ForgotPasswordRepository);
            //  await forgotPasswordRepository.restForgotPassword(req, res, useremail);
        });
    }
}
exports.ForgotPassController = ForgotPassController;
