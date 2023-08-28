import { EntityRepository } from 'typeorm/decorator/EntityRepository';
import { ZoomEntity } from '../entity/zoom.entity';
import { Repository } from 'typeorm/repository/Repository';
import dotenv from 'dotenv';
import { Request, Response } from 'express';
import { ZoomRoot } from '../../../models/zoom.models';
dotenv.config();
@EntityRepository(ZoomEntity)
export class ZoomRepository extends Repository<ZoomEntity> {
  async submitZoomData(req: Request, res: Response) {
    let {
      zoomMeetId,
      zoomMeetPassword,
      zoommeetdateandtime,
      zoom_Available_Slots,
      zoom_Total_Slots,
      zoommeetURL,
      zoomMeetTopic,
    } = req.body;

    await this.createQueryBuilder('zoom')
      .insert()
      .values({
        zoomMeetId,
        zoomMeetPassword,
        zoommeetdateandtime,
        zoom_Available_Slots,
        zoom_Total_Slots,
        zoommeetURL,
        zoomMeetTopic,
      })
      .execute()
      .then((data: any) => {
        if (data !== undefined) {
          return res.send({
            code: 201,
            submitted: true,
            message: ' added Success',
          });
        } else {
          return res.send({
            code: 301,
            submitted: true,
            message: ' not added ',
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
  }

  async fetchZoomdetails(req: Request, res: Response) {
    try {
      let sub_data = await this.createQueryBuilder('zoom').select().getOne();
      //  console.log(sub_data);

      const JSON_string = JSON.stringify({ sub_data });
      // console.log(JSON_string);
      let JSobjdata: ZoomRoot = JSON.parse(JSON_string);
      console.log(JSobjdata.sub_data.zoomId);
      if (
        sub_data !== undefined &&
        JSobjdata.sub_data.zoomMeetIsEnable != null
      ) {
        return res.send({
          data: sub_data,
          code: 201,
          received: true,
        });
      } else {
        //!  undo  sub_data !== undefined
        return res.send({
          data: null,
          code: 301,
          received: false,
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

  //! update zoom in database
  async updateZoom(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;
    let { zoomId } = req.params;
    let {
      zoomMeetId,
      zoomMeetPassword,
      zoommeetdateandtime,
      zoom_Available_Slots,
      zoom_Total_Slots,
      zoommeetURL,
      zoomMeetTopic,
      zoommeetupcomingdate,
    } = req.body;

    if (admin_token === admin_secrect) {
      await this.createQueryBuilder()
        .update(ZoomEntity)
        .set({
          zoomMeetId,
          zoomMeetPassword,
          zoommeetdateandtime,
          zoom_Available_Slots,
          zoom_Total_Slots,
          zoommeetURL,
          zoomMeetTopic,
          zoommeetupcomingdate,
        })
        .where('zoomId = :zoomId', { zoomId })
        .execute()
        .then((data: any) => {
          //  console.log(data);
          if (data !== undefined) {
            return res.send({
              code: 201,
              message: 'zoom updated Sucessfully',
              submitted: true,
            });
          } else {
            return res.send({
              code: 301,
              message: 'zoom not updated ',
              submitted: true,
            });
          }
        })
        .catch((error) => {
          console.log(error);
          return res.send({
            code: 402,
            message: 'zoom update went wrong',
            submitted: false,
          });
        });
    }
  }

  //! update zoom Available slot in database
  async updateZoomAvailableSlot(req: Request, res: Response) {
    let { zoomId } = req.params;
    let { zoom_Available_Slots } = req.body;

    await this.createQueryBuilder()
      .update(ZoomEntity)
      .set({
        zoom_Available_Slots,
      })
      .where('zoomId = :zoomId', { zoomId })
      .execute()
      .then((data: any) => {
        //  console.log(data);
        if (data !== undefined) {
          return res.send({
            code: 201,
            message: 'zoom slot updated Sucessfully',
            submitted: true,
          });
        } else {
          return res.send({
            code: 302,
            message: 'zoom slot not updated ',
            submitted: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.send({
          code: 401,
          message: 'zoom slot went wrong',
          submitted: false,
        });
      });
  }

  //! update zoom is Enable or not in database
  async updateZoomIsenable(req: Request, res: Response) {
    let { zoomId } = req.params;
    let { zoomMeetIsEnable } = req.body;

    await this.createQueryBuilder()
      .update(ZoomEntity)
      .set({
        zoomMeetIsEnable,
      })
      .where('zoomId = :zoomId', { zoomId })
      .execute()
      .then((data: any) => {
        //  console.log(data);
        if (data !== undefined) {
          return res.send({
            code: 201,
            message: 'zoom enable updated Sucessfully',
            submitted: true,
          });
        } else {
          return res.send({
            code: 302,
            message: 'zoom enable not updated ',
            submitted: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.send({
          code: 401,
          message: 'zoom enable went wrong',
          submitted: false,
        });
      });
  }

  //! update zoom date in database
  async updateZoomdate(req: Request, res: Response) {
    let { zoomId } = req.params;
    let { zoommeetupcomingdate } = req.body;

    await this.createQueryBuilder()
      .update(ZoomEntity)
      .set({
        zoommeetupcomingdate,
      })
      .where('zoomId = :zoomId', { zoomId })
      .execute()
      .then((data: any) => {
        //  console.log(data);
        if (data !== undefined) {
          return res.send({
            code: 201,
            message: 'zoom slot updated Sucessfully',
            submitted: true,
          });
        } else {
          return res.send({
            code: 302,
            message: 'zoom slot not updated ',
            submitted: false,
          });
        }
      })
      .catch((error) => {
        console.log(error);
        return res.send({
          code: 401,
          message: 'zoom slot went wrong',
          submitted: false,
        });
      });
  }
}
