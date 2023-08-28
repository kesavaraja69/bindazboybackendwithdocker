import { Request, Response } from 'express';
import { getCustomRepository } from 'typeorm';
import { CategoryRepository } from '../database/category/repo/category.repository';

export class CategoryController {
  static async addCategory(req: Request, res: Response) {
    let categoryRepository = getCustomRepository(CategoryRepository);
    await categoryRepository.addCategory(req, res);
  }
  static async fetchCategorys(req: Request, res: Response) {
    let categoryRepository = getCustomRepository(CategoryRepository);
    await categoryRepository.fetchCategorys(req, res);
  }
  static async fetchCategoryblogs(req: Request, res: Response) {
    let categoryRepository = getCustomRepository(CategoryRepository);
    await categoryRepository.fetchCategoryblogs(req, res);
  }
  static async fetchCategoryblogswithlimit(req: Request, res: Response) {
    let categoryRepository = getCustomRepository(CategoryRepository);
    await categoryRepository.fetchCategoryblogswithlimit(req, res);
  }
}
