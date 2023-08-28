import { Request, Response } from 'express';
import * as EmailValidater from 'email-validator';
import { getCustomRepository } from 'typeorm';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import bcrypt from 'bcrypt';
import { UserRepository } from '../database/repository/user.repository';
import { ForgotPasswordRepository } from '../database/forgotpassword/repository/forgotpassword.repository';

dotenv.config();
export class ForgotPassController {
  static async createjwt(payload: any, secrect: any, res: Response) {
    jwt.sign(
      { payload },
      secrect,
      { expiresIn: '10m' },
      (error: any, jwtdata: any) => {
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
      }
    );
  }

  static async sendgridemail(req: Request, res: Response) {
    let forgotPasswordRepository = getCustomRepository(
      ForgotPasswordRepository
    );
    // await forgotPasswordRepository.sendgridemailsend(req, res);
  }

  static async otpverfiycationemail(req: Request, res: Response) {
    let forgotPasswordRepository = getCustomRepository(
      ForgotPasswordRepository
    );
    await forgotPasswordRepository.otpverfiycationemail(req, res);
  }

  static async otpsendverfiycationemail(req: Request, res: Response) {
    let forgotPasswordRepository = getCustomRepository(
      ForgotPasswordRepository
    );
    await forgotPasswordRepository.otpsendverfiycationemail(req, res);
  }

  static async createNewLink(req: Request, res: Response) {
    let { useremail } = req.body;

    let isValidated = EmailValidater.validate(useremail);

    if (!isValidated) {
      return res.send({
        message: 'inValid Email',
        code: 403,
      });
    }

    let forgotPasswordRepository = getCustomRepository(
      ForgotPasswordRepository
    );
    // await forgotPasswordRepository.userForgotPassword(useremail, res);
  }

  static async updatePassword(req: Request, res: Response) {
    let { updateforgotPassword } = req.body;

    let salt = await bcrypt.genSalt(10);
    bcrypt.hash(
      updateforgotPassword,
      salt,
      async (error: any, hashedpassword: any) => {
        if (error) {
          return res.send({
            user: null,
            message: 'something went wrong',
            code: 400,
          });
        }
        console.log(hashedpassword);
        let forgotPasswordRepository = getCustomRepository(
          ForgotPasswordRepository
        );

        forgotPasswordRepository.updatePassword(req, res, hashedpassword);
      }
    );
  }

  static async restForgotPassword(req: Request, res: Response) {
    let { useremail } = req.params;

    let forgotPasswordRepository = getCustomRepository(
      ForgotPasswordRepository
    );
    //  await forgotPasswordRepository.restForgotPassword(req, res, useremail);
  }
}
