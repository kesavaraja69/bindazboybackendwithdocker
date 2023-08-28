import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ZoomUserEntity } from '../entity/zoomuser.entity';
import { Repository, getCustomRepository } from 'typeorm';

import { Request, Response } from 'express';
import { ZoomRepository } from './zoom.repo';
import { ZoomEntity } from '../entity/zoom.entity';

@EntityRepository(ZoomUserEntity)
export class ZoomUserRepository extends Repository<ZoomUserEntity> {
  async registerUserZoomData(req: Request, res: Response) {
    let { zoomMeetUser, zoomMeetUserEmail, zoomId, zoomdate } = req.body;

    const now = new Date();
    let zoomrepo = getCustomRepository(ZoomRepository);
    let parent_zoom = await zoomrepo.findOne({ zoomId });

    let isExiting: boolean =
      (await this.createQueryBuilder('userzoom')
        .select()
        .where('userzoom.zoomMeetUserEmail = :zoomMeetUserEmail', {
          zoomMeetUserEmail,
        })
        .getCount()) > 0;

    if (isExiting) {
      res.send({
        message: 'user alright exists',
        authentication: false,
        code: 400,
      });
    } else {
      let zoomUserEntity = new ZoomUserEntity();

      zoomUserEntity.zoomMeetUser = zoomMeetUser;
      zoomUserEntity.zoomMeetUserEmail = zoomMeetUserEmail;
      zoomUserEntity.zoomdt = parent_zoom!;
      zoomUserEntity.user_date = zoomdate;
      if (parent_zoom !== undefined) {
        await zoomUserEntity
          .save()
          .then(async (data: any) => {
            if (data !== undefined) {
              return res.send({
                code: 201,
                submitted: true,
                message: ' added user zoom Success',
              });
            } else {
              return res.send({
                code: 301,
                submitted: true,
                message: 'Not Added ',
              });
            }
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
          code: 403,
          submitted: false,
          message: 'No Zoom Meeting Available',
        });
      }
    }
  }

  async fetchallUserData(req: Request, res: Response) {
    await this.createQueryBuilder('userzoom')
      .select()
      .getMany()
      .then((data: any) => {
        if (data !== undefined) {
          res.send({
            message: 'user data found',
            data: data,
            code: 201,
          });
        } else {
          res.send({
            message: 'user data not found',
            data: null,
            code: 301,
          });
        }
      })
      .catch((error: any) => {
        if (error) {
          return res.send({
            code: 402,
            data: null,
            message: 'Something went wrong, Try again!',
          });
        }
      });
  }

  async checkUserZoomData(req: Request, res: Response) {
    let { zoomMeetUserEmail } = req.params;

    await this.createQueryBuilder('userzoom')
      .select()
      .where('userzoom.zoomMeetUserEmail = :zoomMeetUserEmail', {
        zoomMeetUserEmail,
      })
      .getOne()
      .then((data: any) => {
        if (data !== undefined) {
          res.send({
            message: 'user alright exists',
            isUser: true,
            data: data,
            code: 201,
          });
        } else {
          res.send({
            message: 'user not found',
            isUser: false,
            data: null,
            code: 301,
          });
        }
      })
      .catch((error: any) => {
        if (error) {
          return res.send({
            code: 402,
            isUser: false,
            data: null,
            message: 'Something went wrong, Try again!',
          });
        }
      });
  }

  async removeAllUserZoomData(req: Request, res: Response) {
    await this.createQueryBuilder('userzoom')
      .select()
      .delete()
      .execute()
      .then((data: any) => {
        // console.log(data);
        var isAffected = data.affected;
        if (isAffected > 0) {
          res.send({
            message: 'user All Removed',
            code: 201,
          });
        } else {
          res.send({
            message: 'user not Removed',
            code: 301,
          });
        }
      })
      .catch((error: any) => {
        if (error) {
          return res.send({
            code: 402,
            message: 'Something went wrong, Try again!',
          });
        }
      });
  }
}
