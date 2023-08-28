import Router from 'express';
import { BlogsController } from '../controllers/blogs.controllers';
const blogRouter = Router();

//! Post
blogRouter.post('/add/:catergory_id', BlogsController.addBlogs);

//! put update
blogRouter.put('/update/:blogupdate_id', BlogsController.updateBlogs);
blogRouter.put('/imageupdate/:blogupdate_id', BlogsController.updateimageBlog);
blogRouter.put('/audioupdate/:blogupdate_id', BlogsController.updateaudioBlog);
blogRouter.put(
  '/imagesupdate/:blogupdate_id',
  BlogsController.updateimagesBlog
);
blogRouter.put('/postviewupdate/:blog_id', BlogsController.addviewpost);

//! Get
blogRouter.get('/', BlogsController.fetchBlogs);
blogRouter.get('/:pageno', BlogsController.fetchBlogswithlimit);

blogRouter.get('/searchtitle/:query', BlogsController.searchBlogs);
blogRouter.get('/categorys/:category', BlogsController.categoryBlogs);
blogRouter.get(
  '/categoryswithlimit/:catergory_title/:pageno',
  BlogsController.fetchCategoryblogswithlimit
);
blogRouter.get('/detail/:detailid', BlogsController.loadingBlogsDetail);

//! Delete
blogRouter.delete('/delete/:deleteid', BlogsController.deleteBlog);
blogRouter.delete(
  '/filedelete/:filetype/:filename/:deleteid/:fileindex',
  BlogsController.removefile
);

//!patch
blogRouter.patch('/addimageupload/:filetype', BlogsController.imagekitioupload);
blogRouter.patch(
  '/addimagesupload/:imagno',
  BlogsController.imagekitiouploadimages
);
blogRouter.patch(
  '/addfiletosr/:filetype',
  BlogsController.imageuploadtoStorageserver
);

blogRouter.patch(
  '/addfilestosr/:filetype/:imagno',
  BlogsController.imageuploadtoStorageserver
);

export { blogRouter };
