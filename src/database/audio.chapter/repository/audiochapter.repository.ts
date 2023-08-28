import { Response, Request } from 'express';
import dotenv from 'dotenv';
import { AudiobookchapterEntity } from '../entity/audiochapter.entity';
import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { AudioBookRepository } from '../../audiobooks/repositry/audiobook.repository';

dotenv.config();
@EntityRepository(AudiobookchapterEntity)
export class AudiobookchapterRepository extends Repository<AudiobookchapterEntity> {
  async addaudiobookchapter(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;

    if (admin_token === admin_secrect) {
      let {
        audiobookchapter_title,
        audiobookchapter_description,
        audiobookchapter_audiourl,
        audiobook_id,
      } = req.body;

      let catergoryrepo = getCustomRepository(AudioBookRepository);
      let parent_catergory = await catergoryrepo.findOne({
        audiobook_id,
      });

      await this.createQueryBuilder('audiobookschapter')
        .insert()
        .values({
          audiobookchapter_title,
          audiobookchapter_description,
          audiobookchapter_audiourl,
          audiobooks: parent_catergory!,
        })
        .execute()
        .then((data: any) => {
          return res.send({
            code: 201,
            submitted: true,
            message: 'Catergroy added under database!',
          });
        })
        .catch((error: any) => {
          if (error) {
            return res.send({
              code: 402,
              submitted: false,
              message: 'Something went wrong, Try again!',
            });
          }
        });
    } else {
      return res.send({
        code: 401,
        message: 'your not admin',
        submitted: false,
      });
    }
  }

  async fetchaudiochapter(req: Request, res: Response) {
    try {
      let sub_service = await this.createQueryBuilder('audiobookschapter')
        .select()
        .getMany();

      if (sub_service !== undefined) {
        return res.send({
          data: sub_service,
          code: 200,
          received: true,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          data: null,
          code: 401,
          received: false,
        });
      }
    }
  }

  async fetchaudiochapterwithaudio(req: Request, res: Response) {
    let { audioid, audiochapterid } = req.params;
    try {
      let sub_service = await this.createQueryBuilder('audiobookschapter')
        .leftJoinAndSelect('audiobookschapter.audiobooks', 'audiobooks')
        .select()
        .where('audiobooks.audiobook_id = :audioid', { audioid })
        .andWhere('audiobookschapter.audiobookchapter_id = :audiochapterid', {
          audiochapterid,
        })
        .getOne();

      if (sub_service !== undefined) {
        return res.send({
          data: sub_service,
          code: 200,
          received: true,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          data: null,
          code: 401,
          received: false,
        });
      }
    }
  }
}
