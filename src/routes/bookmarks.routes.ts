import { Router } from "express";
import { BookmarkBlogContorller } from "../controllers/bookmarkblog.controller";

const bookmarkBlogRouter = Router();

//! @GET
bookmarkBlogRouter.get(
  "/user/:useremail",
  BookmarkBlogContorller.fetchBookmarksByUser
);

//! @POST
bookmarkBlogRouter.post("/add", BookmarkBlogContorller.addBookmark);
bookmarkBlogRouter.post(
  "/checkIfExists",
  BookmarkBlogContorller.checkIfBookmarkExists
);

//! @DELETE
bookmarkBlogRouter.delete(
  "/delete/:bookmark_id",
  BookmarkBlogContorller.deleteBookmark
);

export { bookmarkBlogRouter };
