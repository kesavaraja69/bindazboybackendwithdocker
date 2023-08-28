import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { AudiobookchapterRepository } from "../database/audio.chapter/repository/audiochapter.repository";

export class AudiobookChapterController {
  static async addaudiobookchapter(req: Request, res: Response) {
    let categoryRepository = getCustomRepository(AudiobookchapterRepository);
    await categoryRepository.addaudiobookchapter(req, res);
  }

  static async fetchaudiochapter(req: Request, res: Response) {
    let categoryRepository = getCustomRepository(AudiobookchapterRepository);
    await categoryRepository.fetchaudiochapter(req, res);
  }

  static async fetchaudiochapterwithaudio(req: Request, res: Response) {
    let categoryRepository = getCustomRepository(AudiobookchapterRepository);
    await categoryRepository.fetchaudiochapterwithaudio(req, res);
  }
  
}
