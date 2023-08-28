import { Request, Response } from "express";
import { adminfs } from "./admin_service";

export class AdminNotificationController {
  static async sendnotification(req: Request, res: Response) {
    let { title, body } = req.body;

    let FCMToken = "bindazboy";
    let message = {
      notification: {
        title: title,
        body: body,
      },
      topic: FCMToken,
    };

    let admin = adminfs;

    admin
      .messaging()
      .send(message)
      .then((data: any) => {
        console.log(data);
        return res.send({
          code: 201,
          message: "message sent sucessfully",
          submitted: true,
        });
      })
      .catch((error) => {
        console.log(error);
        return res.send({
          code: 401,
          message: "something went wrong",
          submitted: false,
        });
      });
  }
}
