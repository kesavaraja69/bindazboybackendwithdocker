import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { BlogRepository } from '../database/blogs/repository/blogs.repository';

export class BlogsController {
  static async addBlogs(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.addBlogs(req, res);
  }
  static async imagekitioupload(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.imagekitioupload(req, res);
  }

  static async removefile(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.removefile(req, res);
  }

  static async imagekitiouploadimages(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.imagekitiouploadimages(req, res);
  }
  static async addviewpost(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.addviewpost(req, res);
  }
  static async searchBlogs(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.searchBlogs(req, res);
  }

  static async updateBlogs(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.updateBlogs(req, res);
  }

  static async updateimageBlog(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.updateimageBlog(req, res);
  }
  static async updateaudioBlog(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.updateaudioBlog(req, res);
  }
  static async fetchBlogs(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.fetchBlogs(req, res);
  }
  static async fetchBlogswithlimit(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.fetchBlogswithlimit(req, res);
  }
  static async categoryBlogs(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.categoryBlogs(req, res);
  }
  static async fetchCategoryblogswithlimit(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.fetchCategoryblogswithlimit(req, res);
  }
  static async loadingBlogsDetail(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.loadingBlogsDetail(req, res);
  }

  static async updateimagesBlog(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.updateimagesBlog(req, res);
  }

  static async deleteBlog(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.deleteBlog(req, res);
  }

  //! upload all file to storage server
  static async imageuploadtoStorageserver(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(BlogRepository);
    await blogsRepository.imageuploadtoStorageserver(req, res);
  }
}
