import { EntityRepository, Repository } from "typeorm";
import { Request, Response } from "express";
import { AdminEntity } from "../entity/admin.entity";

@EntityRepository(AdminEntity)
export class AdminRepository extends Repository<AdminEntity> {
  async sumbitAdmin(
    req: Request,
    res: Response,
    haspassword: string
  ): Promise<boolean> {
    let { admin_email } = req.body;

    let isAdminDuplicated =
      (await this.createQueryBuilder("admin")
        .select()
        .where("admin.admin_email = :admin_email", { admin_email })
        .getCount()) > 0;

    if (isAdminDuplicated) {
      res.send({
        message: "Admin is Already exists",
        code: 405,
      });
    }

    if (!isAdminDuplicated) {
      await this.createQueryBuilder("admin")
        .insert()
        .values({
          admin_email,
          admin_password: haspassword,
        })
        .execute()
        .then((data: any) => {
          if (data != undefined) {
            return true;
          }
        })
        .catch((error: any) => {
          if (error) {
            return false;
          }
        });
    }

    return true;
  }

  async findAdmindata(admin_email: string) {
    let baseadmin = this.createQueryBuilder("admin")
      .select()
      .where("admin.admin_email = :admin_email", { admin_email })
      .getOne();

    return baseadmin;
  }
}
