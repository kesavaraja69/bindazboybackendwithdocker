import { EntityRepository, getCustomRepository, Repository } from "typeorm";
import { Response, Request } from "express";
import dotenv from "dotenv";
import { AudiobookEntity } from "../entity/audiobook.entity";
import { AudiobookchapterRepository } from "../../audio.chapter/repository/audiochapter.repository";
dotenv.config();
@EntityRepository(AudiobookEntity)
export class AudioBookRepository extends Repository<AudiobookEntity> {
  async addaudiobook(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;

    if (admin_token === admin_secrect) {
      let {
        audiobook_title,
        audiobook_description,
        audiobook_imagecover,
        audiobook_author,
        audiobook_date,
      } = req.body;

      let audiobookenity = new AudiobookEntity();

      audiobookenity.audiobook_title = audiobook_title;
      audiobookenity.audiobook_description = audiobook_description;
      audiobookenity.audiobook_imagecover = audiobook_imagecover;
      audiobookenity.audiobook_author = audiobook_author;
      audiobookenity.audiobook_date = audiobook_date;

      await audiobookenity
        .save()
        .then((data: any) => {
          return res.send({
            code: 201,
            message: "audiobook Added Sucessfully",
            submitted: true,
          });
        })
        .catch((error) => {
          console.log(error);
          return res.send({
            code: 401,
            message: null,
            submitted: false,
          });
        });
    } else {
      return res.send({
        code: 409,
        message: "your not admin",
        submitted: false,
      });
    }
  }

  async fetchaudiobookwithchapter(req: Request, res: Response) {
    let { audioid } = req.params;
    let blogsaudiochapter = await this.createQueryBuilder("audiobooks")
      .leftJoinAndSelect("audiobooks.audiochapter", "audiobookschapter")
      .select()
      .orderBy("audiobooks.audiobook_id", "DESC")
      .where("audiobooks.audiobook_id = :audioid", { audioid })
      .getOne();

    try {
      if (blogsaudiochapter !== undefined) {
        return res.send({
          received: true,
          data: blogsaudiochapter,
          message: "blog detail recived",
          code: 200,
        });
      } else {
        return res.send({
          received: false,
          data: null,
          message: "no blogs add please",
          code: 402,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          received: false,
          data: null,
          message: "something went wrong",
          code: 403,
        });
      }
    }
  }

  async fetchaudiobooks(req: Request, res: Response) {
    let blogsaudiobooks = await this.createQueryBuilder("audiobooks")
      .select()
      .orderBy("audiobooks.audiobook_id", "DESC")
      .getMany();

    try {
      if (blogsaudiobooks !== undefined) {
        return res.send({
          received: true,
          data: blogsaudiobooks,
          message: "blogs recived",
          code: 200,
        });
      } else {
        return res.send({
          received: true,
          data: null,
          message: "no blogs add please",
          code: 402,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          received: false,
          data: null,
          message: "something went wrong",
          code: 403,
        });
      }
    }
  }
}
