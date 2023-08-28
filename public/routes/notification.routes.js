"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.notificationRouter = void 0;
const express_1 = require("express");
const notification_service_1 = require("../services/notification_service");
const notificationRouter = (0, express_1.Router)();
exports.notificationRouter = notificationRouter;
notificationRouter.post("/firebase/sendnotification", notification_service_1.AdminNotificationController.sendnotification);
