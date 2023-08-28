import Router from 'express';
import { CategoryController } from '../controllers/categorys.controller';

const categoryRouter = Router();

//! post
categoryRouter.post('/add', CategoryController.addCategory);

//! get
categoryRouter.get('/categorys', CategoryController.fetchCategorys);
categoryRouter.get(
  '/categoryblogs/:catergory_title',
  CategoryController.fetchCategoryblogs
);
categoryRouter.get(
  '/categoryblogswithlimit/:catergory_title/:pageno',
  CategoryController.fetchCategoryblogswithlimit
);

export { categoryRouter };
