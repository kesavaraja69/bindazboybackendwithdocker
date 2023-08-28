import { EntityRepository, Repository, getCustomRepository } from 'typeorm';
import { Request, Response } from 'express';
import dotenv from 'dotenv';

import { UserEntity } from '../../entity/user.entity';
import { UserRepository } from '../../repository/user.repository';
import { ForgotPasswordEntity } from '../entity/forgotpassword.entity';
import {
  MyArraysforgotlist,
  MyArrayslistClass,
} from '../../../models/forgot.model';
dotenv.config();
@EntityRepository(UserEntity)
export class ForgotPasswordRepository extends Repository<ForgotPasswordEntity> {
  async updatePassword(req: Request, res: Response, updateforgotPassword: any) {
    let { useremail } = req.params;
    let baseUser = await this.createQueryBuilder('users')
      .select()
      .where('users.useremail = :useremail', { useremail })
      .getOne();

    if (baseUser === undefined) {
      return res.send({
        authentication: false,
        message: 'User not Found',
        code: 404,
      });
    } else {
      await this.createQueryBuilder()
        .update(UserEntity)
        .set({
          userpassword: updateforgotPassword,
        })
        .where('useremail = :useremail', { useremail })
        .execute()
        .then((data: any) => {
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
  }

  async otpsendverfiycationemail(req: Request, res: Response) {
    let { useremail } = req.body;
    var nodemailer = require('nodemailer');
    let myArrayslist: Array<any> = [];
    try {
      const otp = `${Math.floor(1000 + Math.random() * 9000)}`;

      await nodemailer.createTestAccount((err: any) => {
        if (err) {
          console.log(err);
          return;
        }
      });
      let transporter = await nodemailer.createTransport({
        name: process.env.Forgotemname,
        host: process.env.Forgotemhost as String,
        port: process.env.Forgotemport as String,
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

      let baseUser = await this.createQueryBuilder('users')
        .select()
        .where('users.useremail = :useremail', { useremail })
        .getOne();

      if (baseUser === undefined) {
        return res.send({
          message: 'User not Found',
          code: 404,
        });
      } else {
        await this.createQueryBuilder('users')
          .leftJoinAndSelect('users.forgotpassword', 'forgotpassword')
          .select(['users.username', 'forgotpassword'])
          .where('users.useremail = :useremail', { useremail })
          .getOne()
          .then(async (data: any) => {
            let dataam: any = Object.values(data);
            //  console.log(`otp is ${dataam}`);
            myArrayslist = dataam[1];
            if (myArrayslist != undefined) {
              const JSON_string = JSON.stringify({ myArrayslist });
              // console.log(JSON_string);
              let JSobj: MyArraysforgotlist = JSON.parse(JSON_string);
              // console.log(`otp is fn ${JSobj.myArrayslist.otp}`);
              const otpdata = JSobj.myArrayslist.otp;
              let forgotid = JSobj.myArrayslist.forgotid;

              await this.createQueryBuilder('forgotpassword')
                .delete()
                .from(ForgotPasswordEntity)
                .where('forgotpassword.forgotid = :forgotid', { forgotid })
                .execute()
                .then((data: any) => {
                  var affected = data.affected;
                  console.log(affected);
                  if (affected > 0) {
                    console.log('data is removed');
                  } else {
                    console.log('data is not removed');
                  }
                });
            }
          });

        let userinfoRepo = getCustomRepository(UserRepository);
        let userinfo = await userinfoRepo.findOne({ useremail });

        let forgotEntity = new ForgotPasswordEntity();

        forgotEntity.user = userinfo!;
        forgotEntity.email = useremail;
        forgotEntity.crt_date = Date.now().toString();
        forgotEntity.exp_date = `${Date.now() + 3600000}`;
        forgotEntity.otp = otp;

        await forgotEntity
          .save()
          .then(async (data: any) => {
            console.log('data is added');
            // return res.send({
            //   code: 201,
            //   message: "Blog Added Sucessfully",
            //   submitted: true,
            // });
            await transporter
              .sendMail(mailOptions)
              .then((data: any) => {
                //  console.log(data);
                if (data !== undefined) {
                  return res.send({
                    code: 201,
                    message: 'Otp Send SuccessFully',
                  });
                }
              })
              .catch((error: any) => {
                if (error !== undefined) {
                  console.log(`Something went wrong, email ${error}`);
                  // return res.send({
                  //   code: 402,
                  //   message: "Something went wrong, email",
                  // });
                }
              });
          })
          .catch((error) => {
            console.log('Something went wrong');
            // return res.send({
            //   code: 401,
            //   message: "Something went wrong",
            // });
          });
      }
    } catch (error) {
      console.log('Something went wrong, Try again');
      // return res.send({
      //   code: 403,
      //   message: "Something went wrong, Try again",
      // });
    }
  }

  async otpverfiycationemail(req: Request, res: Response) {
    let { otpcode, useremail } = req.body;
    let myArrayslist: Array<any> = [];
    try {
      let baseUser = await this.createQueryBuilder('users')
        .select()
        .where('users.useremail = :useremail', { useremail })
        .getOne();

      if (baseUser === undefined) {
        return res.send({
          authentication: false,
          message: 'User not Found',
          code: 404,
        });
      } else {
        //  let userinfoRepo = getCustomRepository(ForgotPasswordRepository);
        // //  let userinfoRepo = getCustomRepository(UserRepository);
        //   let userinfo = await userinfoRepo.findOne({ user });

        //   await userinfo?.remove();
        //   return res.send({
        //     authentication: true,
        //     message: "User Removed",
        //     code: 203,
        //   });

        let forgotdata = await this.createQueryBuilder('users')
          .leftJoinAndSelect('users.forgotpassword', 'forgotpassword')
          .select(['users.username', 'forgotpassword'])
          .where('users.useremail = :useremail', { useremail })
          .getOne()
          .then(async (data: any) => {
            let dataam: any = Object.values(data);
            //  console.log(`otp is ${dataam}`);
            myArrayslist = dataam[1];
            if (myArrayslist != undefined) {
              const JSON_string = JSON.stringify({ myArrayslist });
              // console.log(JSON_string);
              let JSobj: MyArraysforgotlist = JSON.parse(JSON_string);
              // console.log(`otp is fn ${JSobj.myArrayslist.otp}`);
              const otpdata = JSobj.myArrayslist.otp;
              let forgotid = JSobj.myArrayslist.forgotid;
              if (otpdata === otpcode) {
                await this.createQueryBuilder('forgotpassword')
                  .delete()
                  .from(ForgotPasswordEntity)
                  .where('forgotpassword.forgotid = :forgotid', { forgotid })
                  .execute()
                  .then((data: any) => {
                    var affected = data.affected;
                    console.log(affected);
                    if (affected > 0) {
                      return res.send({
                        code: 201,
                        message: 'OTP is verifyed',
                      });
                    } else {
                      return res.send({
                        code: 500,
                        message: 'Something went wrong, forgot',
                      });
                    }
                  });
                console.log('otp matched');
              } else {
                console.log('OTP not matched, Enter Correct OTP ');
                return res.send({
                  code: 305,
                  message: 'OTP not matched, Enter Correct OTP',
                });
              }
            } else {
              return res.send({
                code: 306,
                message: 'OTP not matched, try agian',
              });
            }
          });
      }
    } catch (error) {
      console.log(error);
      return res.send({
        code: 403,
        message: 'something went wrong forgotpassword',
      });
    }
  }

  // async userForgotPassword(useremail: string, res: Response) {
  //   // let serviceSid = process.env.TWILIO_SERVICEID as string;
  //   // let accountSid = process.env.TWILIO_ACCOUNT_SID as string;
  //   // let authToken = process.env.TWILIO_AUTH_TOKEN as string;
  //   // let twilioEmail = process.env.TWILIO_EMAIL as string;

  //   // let client = require('twilio')(
  //   //   'AC6f021d2ee808c78530aa75fbaf71d5ba',
  //   //   '756114e46514615e530a43067bc01f8a'
  //   // );

  //   let baseUser = await this.createQueryBuilder('users')
  //     .select()
  //     .where('users.useremail = :useremail', { useremail })
  //     .getOne();

  //   if (baseUser === undefined) {
  //     return res.send({
  //       message: 'User not Found',
  //       code: 404,
  //     });
  //   } else {
  //     try {
  //       //  let tiwlo =
  //       await client.verify
  //         .services('VAe5e49728239e8eab4d52820c679a1a5d')
  //         .verifications.create({
  //           to: useremail,
  //           channel: 'email',
  //         });

  //       // if (tiwlo) {
  //       //   console.log(tiwlo)
  //       //   res.send({
  //       //     message: "sent OTP sucessfully Check your Email",
  //       //     submitted: true,
  //       //     code: 201,
  //       //   });
  //       //  } else {
  //       res.send({
  //         message: 'unable to send OTP',
  //         submitted: false,
  //         code: 402,
  //       });
  //       //  }
  //     } catch (error) {
  //       console.log(error);
  //       res.send({
  //         message: 'something went wrong',
  //         submitted: false,
  //         code: 403,
  //       });
  //     }
  //   }
  // }

  // async sendgridemailsend(req: Request, res: Response) {
  //   const sgMail = require('@sendgrid/mail');
  //   sgMail.setApiKey(process.env.SENDGRID_API_KEY);
  //   const msg = {
  //     to: 'kesav416@gmail.com',
  //     from: 'dragonfistadmin@dragonfistztamilan.in', // Use the email address or domain you verified above
  //     subject: 'Sending with Twilio SendGrid is Fun',
  //     text: 'and easy to do anywhere, even with Node.js',
  //     html: '<strong>and easy to do anywhere, even with Node.js</strong>',
  //   };
  //   //ES6
  //   await sgMail.send(msg).then(
  //     (data: any) => {
  //       res.send({
  //         message: 'sent OTP sucessfully Check your Email',
  //         submitted: true,

  //         code: 201,
  //       });
  //     },
  //     (error: any) => {
  //       console.error(error);
  //       res.send({
  //         message: 'something went wrong',
  //         submitted: false,
  //         code: 403,
  //       });
  //       if (error.response) {
  //         console.error(error.response.body);
  //       }
  //     }
  //   );
  // }

  // async restForgotPassword(req: Request, res: Response, useremail: string) {
  //   let { otpcode } = req.body;

  //   let serviceSid = process.env.TWILIO_SERVICEID as string;
  //   let accountSid = process.env.TWILIO_ACCOUNT_SID as string;
  //   let authToken = process.env.TWILIO_AUTH_TOKEN as string;

  //   let client = new Twilio(accountSid, authToken);

  //   try {
  //     await client.verify.v2
  //       .services(serviceSid)
  //       .verificationChecks.create({ to: useremail, code: otpcode })
  //       .then(async (verificationChecks) => {
  //         if (verificationChecks.valid == true) {
  //           return res.send({
  //             message: 'OTP verfity sucessfully',
  //             submitted: true,
  //             code: 201,
  //           });
  //         }
  //       });
  //   } catch (error) {
  //     return res.send({
  //       message: 'OTP wrong try again',
  //       submitted: false,
  //       code: 301,
  //     });
  //   }
  // }
}
