import { Request, Response } from "express";
import * as EmailValidator from "email-validator";
import bycrpt from "bcrypt";
import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { getCustomRepository } from "typeorm";
import { AdminRepository } from "../database/admin/repo/admin.repository";

dotenv.config();
export class AdminAuthenticationController {
  static createjwt = async (payload: any, res: Response) => {
    let jwt_secrect = process.env.JWT_SECRECT as string;
    jwt.sign(
      {
        payload,
      },
      jwt_secrect,
      {
        expiresIn: "1hr",
      },
      (error: any, jwtdata: any) => {
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
      }
    );
  };

  static async signup(req: Request, res: Response) {
    let { admin_email, admin_password } = req.body;

    let isValidated = EmailValidator.validate(admin_email);
    if (!isValidated) {
      return res.send({
        user: null,
        authentication: "false",
        message: "Invalid Email",
        code: 403,
      });
    } else {
      let isExiting =
        (await getCustomRepository(AdminRepository)
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
      } else {
        let salt = await bycrpt.genSalt(10);

        bycrpt.hash(
          admin_password,
          salt,
          async (error: any, haspassword: any) => {
            if (error) {
              return res.send({
                message: "Something went wrong",
                code: 401,
              });
            }

            if (haspassword != undefined) {
              let adminrepo = getCustomRepository(AdminRepository);
              let adminAdded = await adminrepo.sumbitAdmin(
                req,
                res,
                haspassword
              );
              console.log(`Is Admin Added : ${adminAdded}`);

              if (adminAdded) {
                return await AdminAuthenticationController.createjwt(
                  admin_email,
                  res
                );
              }

              if (!adminAdded) {
                return res.send({
                  message: "Admin not Added",
                  code: 406,
                });
              }
            }
          }
        );
      }
    }
  }

  static async login(req: Request, res: Response) {
    let { admin_email, admin_password } = req.body;

    let isValidated = EmailValidator.validate(admin_email);
    if (!isValidated) {
      return res.send({
        user: null,
        authentication: "false",
        message: "Invalid Email",
        code: 403,
      });
    } else {
      let adminrepo = getCustomRepository(AdminRepository);
      let baseuserdata = await adminrepo.findAdmindata(admin_email);

      if (baseuserdata === undefined) {
        return res.send({
          message: "Admin is not found",
          code: 404,
        });
      }

      if (baseuserdata !== undefined) {
        bycrpt.compare(
          admin_password,
          baseuserdata!.admin_password,
          async (error: any, isMatched: boolean) => {
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
            } else {
              return await AdminAuthenticationController.createjwt(
                admin_email,
                res
              );
            }
          }
        );
      }
    }
  }
}
