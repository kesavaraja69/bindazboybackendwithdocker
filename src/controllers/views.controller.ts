import { getCustomRepository } from "typeorm";
import { Request, Response } from "express";
import { ViewsRepository } from "../database/views/repo/view.repo";

export class ViewController {
    static async addViews(req: Request, res: Response) {
        let viewRepository = getCustomRepository(ViewsRepository);
        await viewRepository.addViewspost(req, res);
      }
      static async fetchViews(req: Request, res: Response) {
        let viewRepository = getCustomRepository(ViewsRepository);
        await viewRepository.fetchViews(req, res);
      }
      static async checkuserView(req: Request, res: Response) {
        let viewRepository = getCustomRepository(ViewsRepository);
        await viewRepository.checkuserView(req, res);
      }
}