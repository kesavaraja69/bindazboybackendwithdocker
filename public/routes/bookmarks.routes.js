"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.bookmarkBlogRouter = void 0;
const express_1 = require("express");
const bookmarkblog_controller_1 = require("../controllers/bookmarkblog.controller");
const bookmarkBlogRouter = (0, express_1.Router)();
exports.bookmarkBlogRouter = bookmarkBlogRouter;
//! @GET
bookmarkBlogRouter.get("/user/:useremail", bookmarkblog_controller_1.BookmarkBlogContorller.fetchBookmarksByUser);
//! @POST
bookmarkBlogRouter.post("/add", bookmarkblog_controller_1.BookmarkBlogContorller.addBookmark);
bookmarkBlogRouter.post("/checkIfExists", bookmarkblog_controller_1.BookmarkBlogContorller.checkIfBookmarkExists);
//! @DELETE
bookmarkBlogRouter.delete("/delete/:bookmark_id", bookmarkblog_controller_1.BookmarkBlogContorller.deleteBookmark);
