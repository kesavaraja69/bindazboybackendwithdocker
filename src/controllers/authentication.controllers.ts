import { Request, Response } from 'express';
import jwt from 'jsonwebtoken';
import dotenv from 'dotenv';
import * as EmailValidater from 'email-validator';
import bcrypt from 'bcrypt';
import { Any, getCustomRepository } from 'typeorm';
import { UserRepository } from '../database/repository/user.repository';
import { Console } from 'console';

dotenv.config();
export class AuthenticationController {
  static async fetchusers(req: Request, res: Response) {
    let userRepository = getCustomRepository(UserRepository);
    await userRepository.fetchUsers(req, res);
  }

  static createjwt = async (payload: any, res: Response) => {
    let jwt_secrect = process.env.JWT_SECRECT as string;
    jwt.sign(
      {
        payload,
      },
      jwt_secrect,
      {
        expiresIn: '1hr',
      },
      (error: any, jwtdata: any) => {
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
      }
    );
  };

  static async createNewAccount(req: Request, res: Response) {
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

    let isExiting =
      (await getCustomRepository(UserRepository)
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
    } else {
      let salt = await bcrypt.genSalt(10);
      bcrypt.hash(
        userpassword,
        salt,
        async (error: any, hashedpassword: any) => {
          if (error) {
            return res.send({
              user: null,
              authentication: 'false',
              message: 'something went wrong',
              code: 400,
            });
          }

          console.log(hashedpassword);

          let userRepository = getCustomRepository(UserRepository);
          await userRepository.submitUserData(req, res, hashedpassword);
          await AuthenticationController.createjwt(useremail, res);
        }
      );
    }
  }

  static async login(req: Request, res: Response) {
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
      let userRepository = getCustomRepository(UserRepository);
      let checkuser = await userRepository.findUser(useremail, res);

      if (checkuser === undefined) {
        return res.send({
          authentication: false,
          message: 'User not Found',
          code: 404,
        });
      } else {
        let oldPassword = (await userRepository.findUserPassword(
          useremail,
          res
        )) as string;

        bcrypt.compare(
          userpassword,
          oldPassword,
          async (error: any, isMatched: boolean) => {
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
            } else {
              return await AuthenticationController.createjwt(useremail, res);
            }
          }
        );
      }
    } catch (error) {
      console.log(error);
    }
  }

  static async decodejwt(req: Request, res: Response) {
    let token = req.headers.authorization as string;
    let jwt_secrect = process.env.JWT_SECRECT as string;

    jwt.verify(token, jwt_secrect, (error: any, data: any) => {
      if (error) {
        return res.send({
          authentication: 'false',
          message: 'Somthing went wrong',
          code: 402,
        });
      } else {
        let useremail = data!.useremail;
        return res.send({
          authentication: 'true',
          message: useremail,
        });
      }
    });
  }
}
