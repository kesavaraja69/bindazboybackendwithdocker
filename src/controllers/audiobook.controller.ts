import { Request, Response } from "express";
import { getCustomRepository } from "typeorm";
import { AudioBookRepository } from "../database/audiobooks/repositry/audiobook.repository";

export class AudiobookController {
  static async addaudiobook(req: Request, res: Response) {
    let blogsRepository = getCustomRepository(AudioBookRepository);
    await blogsRepository.addaudiobook(req, res);
  }

 static async fetchaudiobooks(req: Request, res: Response){
  let blogsRepository = getCustomRepository(AudioBookRepository);
  await blogsRepository.fetchaudiobooks(req, res);
 }
 static async fetchaudiobookwithchapter(req: Request, res: Response){
  let blogsRepository = getCustomRepository(AudioBookRepository);
  await blogsRepository.fetchaudiobookwithchapter(req, res);
 }
 
}
