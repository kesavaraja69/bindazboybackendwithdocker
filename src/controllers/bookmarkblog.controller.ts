import { getCustomRepository } from "typeorm/globals";
import { Request, Response } from "express";
import { BookmarkBlogRepository } from "../database/bookmark/repo/bookmark.repository";

export class BookmarkBlogContorller {
  static async addBookmark(req: Request, res: Response) {
    let bookmarkHotelRepository = getCustomRepository(BookmarkBlogRepository);
    await bookmarkHotelRepository.addBookmark(req, res);
  }
  static async fetchBookmarksByUser(req: Request, res: Response) {
    let bookmarkHotelRepository = getCustomRepository(BookmarkBlogRepository);
    await bookmarkHotelRepository.fetchBookmarksByUser(req, res);
  }
  static async deleteBookmark(req: Request, res: Response) {
    let bookmarkHotelRepository = getCustomRepository(BookmarkBlogRepository);
    await bookmarkHotelRepository.deleteBookmark(req, res);
  }
  static async checkIfBookmarkExists(req: Request, res: Response) {
    let bookmarkHotelRepository = getCustomRepository(BookmarkBlogRepository);
    await bookmarkHotelRepository.checkIfBookmarkExists(req, res);
  }
}
