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
exports.ForgotPasswordRepository = void 0;
const typeorm_1 = require("typeorm");
const dotenv_1 = __importDefault(require("dotenv"));
const user_entity_1 = require("../../entity/user.entity");
const user_repository_1 = require("../../repository/user.repository");
const forgotpassword_entity_1 = require("../entity/forgotpassword.entity");
dotenv_1.default.config();
let ForgotPasswordRepository = class ForgotPasswordRepository extends typeorm_1.Repository {
    updatePassword(req, res, updateforgotPassword) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail } = req.params;
            let baseUser = yield this.createQueryBuilder('users')
                .select()
                .where('users.useremail = :useremail', { useremail })
                .getOne();
            if (baseUser === undefined) {
                return res.send({
                    authentication: false,
                    message: 'User not Found',
                    code: 404,
                });
            }
            else {
                yield this.createQueryBuilder()
                    .update(user_entity_1.UserEntity)
                    .set({
                    userpassword: updateforgotPassword,
                })
                    .where('useremail = :useremail', { useremail })
                    .execute()
                    .then((data) => {
                    console.log(data);
                    return res.send({
                        code: 201,
                        message: 'password updated Sucessfully',
                        submitted: true,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 401,
                        message: 'password not updated',
                        submitted: false,
                    });
                });
            }
        });
    }
    otpsendverfiycationemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { useremail } = req.body;
            var nodemailer = require('nodemailer');
            let myArrayslist = [];
            try {
                const otp = `${Math.floor(1000 + Math.random() * 9000)}`;
                yield nodemailer.createTestAccount((err) => {
                    if (err) {
                        console.log(err);
                        return;
                    }
                });
                let transporter = yield nodemailer.createTransport({
                    name: process.env.Forgotemname,
                    host: process.env.Forgotemhost,
                    port: process.env.Forgotemport,
                    secure: true,
                    auth: {
                        user: process.env.ForgotsendEmail,
                        pass: process.env.Forgotempwd,
                    },
                });
                const mailOptions = {
                    from: process.env.ForgotsendEmail,
                    to: useremail,
                    subject: 'OTP For Forgot Password',
                    html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
        <div style="margin:50px auto;width:70%;padding:20px 0">
          <div style="border-bottom:1px solid #eee">
            <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600"> BindazBoy Blog App </a>
          </div>
          <p style="font-size:1.1em">Hi,</p>
          <p>Thank you for Using BindazBoy Blog App. Use the following OTP to complete your Forgot Password procedures. OTP is valid for 5 minutes</p>
          <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
          <p style="font-size:0.9em;">Regards,<br />BindazBoy Blog App</p>
        </div>
      </div>`,
                };
                let baseUser = yield this.createQueryBuilder('users')
                    .select()
                    .where('users.useremail = :useremail', { useremail })
                    .getOne();
                if (baseUser === undefined) {
                    return res.send({
                        message: 'User not Found',
                        code: 404,
                    });
                }
                else {
                    yield this.createQueryBuilder('users')
                        .leftJoinAndSelect('users.forgotpassword', 'forgotpassword')
                        .select(['users.username', 'forgotpassword'])
                        .where('users.useremail = :useremail', { useremail })
                        .getOne()
                        .then((data) => __awaiter(this, void 0, void 0, function* () {
                        let dataam = Object.values(data);
                        //  console.log(`otp is ${dataam}`);
                        myArrayslist = dataam[1];
                        if (myArrayslist != undefined) {
                            const JSON_string = JSON.stringify({ myArrayslist });
                            // console.log(JSON_string);
                            let JSobj = JSON.parse(JSON_string);
                            // console.log(`otp is fn ${JSobj.myArrayslist.otp}`);
                            const otpdata = JSobj.myArrayslist.otp;
                            let forgotid = JSobj.myArrayslist.forgotid;
                            yield this.createQueryBuilder('forgotpassword')
                                .delete()
                                .from(forgotpassword_entity_1.ForgotPasswordEntity)
                                .where('forgotpassword.forgotid = :forgotid', { forgotid })
                                .execute()
                                .then((data) => {
                                var affected = data.affected;
                                console.log(affected);
                                if (affected > 0) {
                                    console.log('data is removed');
                                }
                                else {
                                    console.log('data is not removed');
                                }
                            });
                        }
                    }));
                    let userinfoRepo = (0, typeorm_1.getCustomRepository)(user_repository_1.UserRepository);
                    let userinfo = yield userinfoRepo.findOneBy({ useremail });
                    let forgotEntity = new forgotpassword_entity_1.ForgotPasswordEntity();
                    forgotEntity.user = userinfo;
                    forgotEntity.email = useremail;
                    forgotEntity.crt_date = Date.now().toString();
                    forgotEntity.exp_date = `${Date.now() + 3600000}`;
                    forgotEntity.otp = otp;
                    yield forgotEntity
                        .save()
                        .then((data) => __awaiter(this, void 0, void 0, function* () {
                        console.log('data is added');
                        // return res.send({
                        //   code: 201,
                        //   message: "Blog Added Sucessfully",
                        //   submitted: true,
                        // });
                        yield transporter
                            .sendMail(mailOptions)
                            .then((data) => {
                            //  console.log(data);
                            if (data !== undefined) {
                                return res.send({
                                    code: 201,
                                    message: 'Otp Send SuccessFully',
                                });
                            }
                        })
                            .catch((error) => {
                            if (error !== undefined) {
                                console.log(`Something went wrong, email ${error}`);
                                // return res.send({
                                //   code: 402,
                                //   message: "Something went wrong, email",
                                // });
                            }
                        });
                    }))
                        .catch((error) => {
                        console.log('Something went wrong');
                        // return res.send({
                        //   code: 401,
                        //   message: "Something went wrong",
                        // });
                    });
                }
            }
            catch (error) {
                console.log('Something went wrong, Try again');
                // return res.send({
                //   code: 403,
                //   message: "Something went wrong, Try again",
                // });
            }
        });
    }
    otpverfiycationemail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { otpcode, useremail } = req.body;
            let myArrayslist = [];
            try {
                let baseUser = yield this.createQueryBuilder('users')
                    .select()
                    .where('users.useremail = :useremail', { useremail })
                    .getOne();
                if (baseUser === undefined) {
                    return res.send({
                        authentication: false,
                        message: 'User not Found',
                        code: 404,
                    });
                }
                else {
                    //  let userinfoRepo = getCustomRepository(ForgotPasswordRepository);
                    // //  let userinfoRepo = getCustomRepository(UserRepository);
                    //   let userinfo = await userinfoRepo.findOne({ user });
                    //   await userinfo?.remove();
                    //   return res.send({
                    //     authentication: true,
                    //     message: "User Removed",
                    //     code: 203,
                    //   });
                    let forgotdata = yield this.createQueryBuilder('users')
                        .leftJoinAndSelect('users.forgotpassword', 'forgotpassword')
                        .select(['users.username', 'forgotpassword'])
                        .where('users.useremail = :useremail', { useremail })
                        .getOne()
                        .then((data) => __awaiter(this, void 0, void 0, function* () {
                        let dataam = Object.values(data);
                        //  console.log(`otp is ${dataam}`);
                        myArrayslist = dataam[1];
                        if (myArrayslist != undefined) {
                            const JSON_string = JSON.stringify({ myArrayslist });
                            // console.log(JSON_string);
                            let JSobj = JSON.parse(JSON_string);
                            // console.log(`otp is fn ${JSobj.myArrayslist.otp}`);
                            const otpdata = JSobj.myArrayslist.otp;
                            let forgotid = JSobj.myArrayslist.forgotid;
                            if (otpdata === otpcode) {
                                yield this.createQueryBuilder('forgotpassword')
                                    .delete()
                                    .from(forgotpassword_entity_1.ForgotPasswordEntity)
                                    .where('forgotpassword.forgotid = :forgotid', { forgotid })
                                    .execute()
                                    .then((data) => {
                                    var affected = data.affected;
                                    console.log(affected);
                                    if (affected > 0) {
                                        return res.send({
                                            code: 201,
                                            message: 'OTP is verifyed',
                                        });
                                    }
                                    else {
                                        return res.send({
                                            code: 500,
                                            message: 'Something went wrong, forgot',
                                        });
                                    }
                                });
                                console.log('otp matched');
                            }
                            else {
                                console.log('OTP not matched, Enter Correct OTP ');
                                return res.send({
                                    code: 305,
                                    message: 'OTP not matched, Enter Correct OTP',
                                });
                            }
                        }
                        else {
                            return res.send({
                                code: 306,
                                message: 'OTP not matched, try agian',
                            });
                        }
                    }));
                }
            }
            catch (error) {
                console.log(error);
                return res.send({
                    code: 403,
                    message: 'something went wrong forgotpassword',
                });
            }
        });
    }
};
ForgotPasswordRepository = __decorate([
    (0, typeorm_1.EntityRepository)(user_entity_1.UserEntity)
], ForgotPasswordRepository);
exports.ForgotPasswordRepository = ForgotPasswordRepository;
