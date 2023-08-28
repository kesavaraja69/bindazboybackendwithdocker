"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminNotificationController = void 0;
const admin_service_1 = require("./admin_service");
class AdminNotificationController {
    static sendnotification(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { title, body } = req.body;
            let FCMToken = "bindazboy";
            let message = {
                notification: {
                    title: title,
                    body: body,
                },
                topic: FCMToken,
            };
            let admin = admin_service_1.adminfs;
            admin
                .messaging()
                .send(message)
                .then((data) => {
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
        });
    }
}
exports.AdminNotificationController = AdminNotificationController;
