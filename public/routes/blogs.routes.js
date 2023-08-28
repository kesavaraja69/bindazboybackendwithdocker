"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogRouter = void 0;
const express_1 = __importDefault(require("express"));
const blogs_controllers_1 = require("../controllers/blogs.controllers");
const blogRouter = (0, express_1.default)();
exports.blogRouter = blogRouter;
//! Post
blogRouter.post('/add/:catergory_id', blogs_controllers_1.BlogsController.addBlogs);
//! put update
blogRouter.put('/update/:blogupdate_id', blogs_controllers_1.BlogsController.updateBlogs);
blogRouter.put('/imageupdate/:blogupdate_id', blogs_controllers_1.BlogsController.updateimageBlog);
blogRouter.put('/audioupdate/:blogupdate_id', blogs_controllers_1.BlogsController.updateaudioBlog);
blogRouter.put('/imagesupdate/:blogupdate_id', blogs_controllers_1.BlogsController.updateimagesBlog);
blogRouter.put('/postviewupdate/:blog_id', blogs_controllers_1.BlogsController.addviewpost);
//! Get
blogRouter.get('/', blogs_controllers_1.BlogsController.fetchBlogs);
blogRouter.get('/:pageno', blogs_controllers_1.BlogsController.fetchBlogswithlimit);
blogRouter.get('/searchtitle/:query', blogs_controllers_1.BlogsController.searchBlogs);
blogRouter.get('/categorys/:category', blogs_controllers_1.BlogsController.categoryBlogs);
blogRouter.get('/categoryswithlimit/:catergory_title/:pageno', blogs_controllers_1.BlogsController.fetchCategoryblogswithlimit);
blogRouter.get('/detail/:detailid', blogs_controllers_1.BlogsController.loadingBlogsDetail);
//! Delete
blogRouter.delete('/delete/:deleteid', blogs_controllers_1.BlogsController.deleteBlog);
blogRouter.delete('/filedelete/:filetype/:filename/:deleteid/:fileindex', blogs_controllers_1.BlogsController.removefile);
//!patch
blogRouter.patch('/addimageupload/:filetype', blogs_controllers_1.BlogsController.imagekitioupload);
blogRouter.patch('/addimagesupload/:imagno', blogs_controllers_1.BlogsController.imagekitiouploadimages);
blogRouter.patch('/addfiletosr/:filetype', blogs_controllers_1.BlogsController.imageuploadtoStorageserver);
blogRouter.patch('/addfilestosr/:filetype/:imagno', blogs_controllers_1.BlogsController.imageuploadtoStorageserver);
