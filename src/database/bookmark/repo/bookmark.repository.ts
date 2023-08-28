import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BookmarkBlogEntity } from '../entity/bookmark.entity';
import { Response, Request } from 'express';
import { UserRepository } from '../../repository/user.repository';
import { BlogRepository } from '../../blogs/repository/blogs.repository';
@EntityRepository(BookmarkBlogEntity)
export class BookmarkBlogRepository extends Repository<BookmarkBlogEntity> {
  async addBookmark(req: Request, res: Response) {
    let { useremail, blog_id } = req.body;

    let userinfoRepo = getCustomRepository(UserRepository);
    let userinfo = await userinfoRepo.findOne({ useremail });

    var _isAlreadyBookmarked =
      (await this.createQueryBuilder('bookmark_blog')
        .leftJoin('bookmark_blog.bookmark_user', 'users')
        .leftJoin('bookmark_blog.bookmark_blogdata', 'blogs')
        .select('bookmark_blog.bookmark_id')
        .where('users.useremail = :useremail', { useremail })
        .andWhere('blogs.blog_id = :blog_id', { blog_id })
        .getCount()) > 0;

    if (!_isAlreadyBookmarked) {
      let blogRepo = getCustomRepository(BlogRepository);
      let blogdata = await blogRepo.findOne({ blog_id });

      let bookmarkBlogs = new BookmarkBlogEntity();

      bookmarkBlogs.bookmark_blogdata = blogdata!;
      bookmarkBlogs.bookmark_user = userinfo!;

      await bookmarkBlogs
        .save()
        .then((data: any) => {
          if (data !== undefined) {
            return res.send({
              code: 201,
              message: 'New bookmark created',
            });
          }
        })
        .catch((error: any) => {
          if (error !== undefined) {
            return res.send({
              code: 401,
              message: 'Something went wrong, Try again',
            });
          }
        });
    } else {
      console.log('Already bookmarked');
      return res.send({
        code: 406,
        message: 'Hotel already bookmarked!',
      });
    }
  }

  async fetchBookmarksByUser(req: Request, res: Response) {
    let { useremail } = req.params;

    try {
      let bookmarks = await this.createQueryBuilder('bookmark_blog')
        .leftJoin('bookmark_blog.bookmark_user', 'users')
        .leftJoinAndSelect('bookmark_blog.bookmark_blogdata', 'blogs')
        .where('users.useremail = :useremail', { useremail })
        .getMany();

      if (bookmarks !== undefined) {
        return res.send({
          code: 200,
          data: bookmarks,
        });
      } else {
        return res.send({
          code: 404,
          data: 'Bookmark not found',
        });
      }
    } catch (error) {
      if (error !== undefined) {
        return res.send({
          code: 401,
          data: 'Something went wrong',
        });
      }
    }
  }

  async deleteBookmark(req: Request, res: Response) {
    let { bookmark_id } = req.params;

    try {
      await this.createQueryBuilder('bookmark_blog')
        .delete()
        .from(BookmarkBlogEntity)
        .where('bookmark_blog.bookmark_id = :bookmark_id', { bookmark_id })
        .execute()
        .then((data: any) => {
          var affected = data.affected;
          console.log(affected);
          if (affected > 0) {
            return res.send({
              code: 204,
              message: 'Bookmark deleted',
            });
          } else {
            return res.send({
              code: 500,
              message: 'Something went wrong',
            });
          }
        });
    } catch (error) {
      console.log(error);
      return res.send({
        code: 500,
        message: 'Something went wrong',
      });
    }
  }

  async checkIfBookmarkExists(req: Request, res: Response) {
    let { useremail, blog_id } = req.body;

    var _isAlreadyBookmarked =
      (await this.createQueryBuilder('bookmark_blog')
        .leftJoin('bookmark_blog.bookmark_user', 'users')
        .leftJoin('bookmark_blog.bookmark_blogdata', 'blogs')
        .select('bookmark_blog.bookmark_id')
        .where('users.useremail = :useremail', { useremail })
        .andWhere('blogs.blog_id = :blog_id', { blog_id })
        .getCount()) > 0;

    if (_isAlreadyBookmarked) {
      return res.send({
        code: 200,
        bookmarked: true,
      });
    }
    if (!_isAlreadyBookmarked) {
      return res.send({
        code: 404,
        bookmarked: false,
      });
    }
  }
}
