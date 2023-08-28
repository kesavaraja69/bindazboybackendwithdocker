import { EntityRepository, Repository } from 'typeorm';
import { UserEntity } from '../entity/user.entity';
import e, { Request, Response } from 'express';
import dotenv from 'dotenv';
dotenv.config();
@EntityRepository(UserEntity)
export class UserRepository extends Repository<UserEntity> {
  async fetchUsers(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;

    if (admin_token === admin_secrect) {
      let users = await this.createQueryBuilder('users').select().getMany();
      res.send({
        users,
      });
    } else {
      res.send({
        message: 'your not admin',
      });
    }
  }

  async submitUserData(req: Request, res: Response, hashedpassword: string) {
    let { useremail, username } = req.body;

    let isExiting: boolean =
      (await this.createQueryBuilder('users')
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
  }

  async findUserPassword(useremail: string, res: Response) {
    let baseUser = await this.createQueryBuilder('users')
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
    } else {
      let baseUserPassword = baseUser!.userpassword;
      return baseUserPassword;
    }
  }

  async findUser(useremail: string, res: Response) {
    let baseUser = await this.createQueryBuilder('users')
      .select()
      .where('users.useremail = :useremail', { useremail })
      .getOne();

    return baseUser;
  }
}
