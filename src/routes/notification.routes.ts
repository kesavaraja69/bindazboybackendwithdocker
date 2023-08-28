import { Router } from "express";
import { AdminNotificationController } from "../services/notification_service";

const notificationRouter = Router();

notificationRouter.post("/firebase/sendnotification",AdminNotificationController.sendnotification);

export { notificationRouter };