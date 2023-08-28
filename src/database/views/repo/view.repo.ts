import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { ViewsEntity } from '../entity/view.entity';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { UserRepository } from '../../repository/user.repository';
import { BlogRepository } from '../../blogs/repository/blogs.repository';
dotenv.config();
@EntityRepository(ViewsEntity)
export class ViewsRepository extends Repository<ViewsEntity> {
  //   //! fullscreenpost
  //   async addViews(req: Request, res: Response) {
  //     let { useremail, fs_post_id } = req.body;

  //     var isAlreadyLiked =
  //       (await this.createQueryBuilder("view")
  //         .leftJoin("view.views_post_fs", "fullscreenpost")
  //         .leftJoin("view.views_user", "users")
  //         .select()
  //         .where("users.useremail = :useremail", { useremail })
  //         .andWhere("fullscreenpost.fs_post_id = :fs_post_id", { fs_post_id })
  //         .getCount()) > 0;

  //     if (isAlreadyLiked) {
  //       return res.send({
  //         code: 403,
  //         data: "User is Already Liked",
  //         added: false,
  //       });
  //     }

  //     if (!isAlreadyLiked) {
  //       let userRepositiory = getCustomRepository(UserRepository);
  //       let user = await userRepositiory.findOne({ useremail });

  //       let postRepositiory = getCustomRepository(FullScreenPostRepository);
  //       let postfs = await postRepositiory.findOne({ fs_post_id });

  //       let likeEntity = new ViewsEntity();

  //       likeEntity.views_post_fs = postfs!;
  //       likeEntity.views_user = user!;

  //       await likeEntity
  //         .save()
  //         .then((data: any) => {
  //           if (data !== undefined) {
  //             return res.send({
  //               code: 201,
  //               data: "User is viewed",
  //               added: true,
  //             });
  //           }
  //         })
  //         .catch((error: any) => {
  //           if (error) {
  //             return res.send({
  //               code: 402,
  //               data: "something went wrong",
  //               added: false,
  //             });
  //           }
  //         });
  //     }
  //   }

  async checkuserView(req: Request, res: Response) {
    try {
      let { useremail, blog_id } = req.params;

      var isAlreadyLiked =
        (await this.createQueryBuilder('view')
          .leftJoin('view.view_post', 'blogs')
          .leftJoin('view.views_user', 'users')
          .select('view.view_id')
          .where('users.useremail = :useremail', { useremail })
          .andWhere('blogs.blog_id = :blog_id', { blog_id })
          .getCount()) > 0;

      if (isAlreadyLiked) {
        var islikeduser = await this.createQueryBuilder('view')
          .leftJoin('view.view_post', 'blogs')
          .leftJoin('view.views_user', 'users')
          .select('view.view_id')
          .where('users.useremail = :useremail', { useremail })
          .andWhere('blogs.blog_id = :blog_id', { blog_id })
          .getOne();

        res.send({
          code: 201,
          data: 'User is viewed ',
          message: islikeduser,
          isViewed: true,
        });
      } else {
        return res.send({
          code: 301,
          data: 'User is not viewed',
          message: null,
          isViewed: false,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  async fetchViews(req: Request, res: Response) {
    try {
      let { blog_id } = req.params;
      let response = await this.createQueryBuilder('view')
        .leftJoin('view.view_post', 'blogs')
        .leftJoin('view.views_user', 'users')
        .select()
        .where('blogs.blog_id = :blog_id', { blog_id })
        .getMany();

      let data1 = response.length > 0;
      if (!data1) {
        return res.send({
          code: 204,
          recivied: false,
          data: response,
        });
      } else {
        return res.send({
          code: 201,
          recivied: true,
          data: response,
        });
      }
    } catch (error) {
      console.log(error);
    }
  }

  //! post
  async addViewspost(req: Request, res: Response) {
    let { useremail, blog_id } = req.body;

    var isAlreadyLiked =
      (await this.createQueryBuilder('view')
        .leftJoin('view.view_post', 'blogs')
        .leftJoin('view.views_user', 'users')
        .select()
        .where('users.useremail = :useremail', { useremail })
        .andWhere('blogs.blog_id = :blog_id', { blog_id })
        .getCount()) > 0;

    if (isAlreadyLiked) {
      return res.send({
        code: 403,
        data: 'User is Already Viewed',
        added: false,
      });
    }

    if (!isAlreadyLiked) {
      let userRepositiory = getCustomRepository(UserRepository);
      let user = await userRepositiory.findOne({ useremail });

      let postRepositiory = getCustomRepository(BlogRepository);
      let postfs = await postRepositiory.findOne({ blog_id });

      let likeEntity = new ViewsEntity();

      likeEntity.view_post = postfs!;
      likeEntity.views_user = user!;

      await likeEntity
        .save()
        .then((data: any) => {
          if (data != undefined) {
            return res.send({
              code: 201,
              data: 'User is Viewed',
              added: true,
            });
          } else {
            return res.send({
              code: 301,
              data: 'User is not Viewed',
              added: true,
            });
          }
        })
        .catch((error: any) => {
          if (error) {
            return res.send({
              code: 402,
              data: 'something went wrong',
              added: false,
            });
          }
        });
    }
  }

  //   async checkuserViewpost(req: Request, res: Response) {
  //     try {
  //       let { useremail, post_id } = req.params;

  //       var isAlreadyLiked =
  //         (await this.createQueryBuilder("view")
  //           .leftJoin("view.view_post", "post")
  //           .leftJoin("view.views_user", "users")
  //           .select("view.view_id")
  //           .where("users.useremail = :useremail", { useremail })
  //           .andWhere("post.post_id = :post_id", { post_id })
  //           .getCount()) > 0;

  //       if (isAlreadyLiked) {
  //         var islikeduser = await this.createQueryBuilder("view")
  //           .leftJoin("view.view_post", "post")
  //           .leftJoin("view.views_user", "users")
  //           .select("view.view_id")
  //           .where("users.useremail = :useremail", { useremail })
  //           .andWhere("post.post_id = :post_id", { post_id })
  //           .getOne();

  //         res.send({
  //           code: 201,
  //           data: "User is viewed ",
  //           message: islikeduser,
  //           isliked: true,
  //         });
  //       } else {
  //         return res.send({
  //           code: 301,
  //           data: "User is not viewed",
  //           isliked: false,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }

  //   async fetchviewspost(req: Request, res: Response) {
  //     try {
  //       let { post_id } = req.params;
  //       let response = await this.createQueryBuilder("view")
  //         .leftJoin("view.view_post", "post")
  //         .leftJoin("view.views_user", "users")
  //         .select()
  //         .where("post.post_id = :post_id", { post_id })
  //         .getMany();

  //       let data1 = response.length > 0;
  //       if (!data1) {
  //         return res.send({
  //           code: 204,
  //           recivied: false,
  //           data: "data is empty",
  //         });
  //       } else {
  //         return res.send({
  //           code: 201,
  //           recivied: true,
  //           data: response,
  //         });
  //       }
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
}
