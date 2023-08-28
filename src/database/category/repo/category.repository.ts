import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BlogRepository } from '../../blogs/repository/blogs.repository';
import { CatergoryEntity } from '../entity/category.entity';
import { Response, Request } from 'express';
import dotenv from 'dotenv';

dotenv.config();
@EntityRepository(CatergoryEntity)
export class CategoryRepository extends Repository<CatergoryEntity> {
  async addCategory(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;
    //let { blog_id } = req.params;

    if (admin_token === admin_secrect) {
      let { catergory_title } = req.body;

      await this.createQueryBuilder('catergory')
        .insert()
        .values({ catergory_title })
        .execute()
        .then((data: any) => {
          return res.send({
            code: 201,
            submitted: true,
            message: 'Catergroy added under database!',
          });
        })
        .catch((error: any) => {
          if (error) {
            return res.send({
              code: 402,
              submitted: false,
              message: 'Something went wrong, Try again!',
            });
          }
        });
    } else {
      return res.send({
        code: 401,
        message: 'your not admin',
        submitted: false,
      });
    }
  }

  async fetchCategoryblogs(req: Request, res: Response) {
    let { catergory_title } = req.params;

    try {
      let sub_service = await this.createQueryBuilder('catergory')
        .leftJoinAndSelect('catergory.blogs', 'blogs')
        .where('catergory.catergory_title = :catergory_title', {
          catergory_title,
        })
        .getMany();

      if (sub_service !== undefined) {
        return res.send({
          data: sub_service,
          code: 200,
          received: true,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          data: null,
          code: 401,
          received: false,
        });
      }
    }
  }

  async fetchCategoryblogswithlimit(req: Request, res: Response) {
    let peritem = 9;
    let { catergory_title, pageno } = req.params;

    try {
      let sub_service = await this.createQueryBuilder('catergory')
        .leftJoinAndSelect('catergory.blogs', 'blogs')
        .where('catergory.catergory_title = :catergory_title', {
          catergory_title,
        })
        .offset((parseInt(pageno) - 1) * peritem)
        .limit(peritem)
        .getMany();


      if (sub_service !== undefined) {
        return res.send({
          data: sub_service,
          code: 200,
          received: true,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          data: null,
          code: 401,
          received: false,
        });
      }
    }
  }

  async fetchCategorys(req: Request, res: Response) {
    /*
        1.Code : Status code
        2.Data : Error/Actual data
        3.Submitted : Boolean for submission (true/false)
    */
    // let { blogs_cat_id } = req.params;

    try {
      let sub_service = await this.createQueryBuilder('catergory')
        .select()
        .getMany();

      if (sub_service !== undefined) {
        return res.send({
          data: sub_service,
          code: 200,
          received: true,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          data: null,
          code: 401,
          received: false,
        });
      }
    }
  }
}
