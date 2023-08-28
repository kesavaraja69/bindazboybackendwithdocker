"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.zoomRouter = void 0;
const express_1 = __importDefault(require("express"));
const zoom_controllers_1 = require("../controllers/zoom.controllers");
const zoomRouter = (0, express_1.default)();
exports.zoomRouter = zoomRouter;
//! Zoom
//! post
zoomRouter.post('/Addzoom', zoom_controllers_1.ZoomsController.addZoom);
//! get
zoomRouter.get('/getzoomdetail', zoom_controllers_1.ZoomsController.fetchZoom);
//! update
zoomRouter.put('/updatezoomsisenable/:zoomId', zoom_controllers_1.ZoomsController.updateZoomIsenable);
zoomRouter.put('/updatezoomslot/:zoomId', zoom_controllers_1.ZoomsController.updatezoomSlot);
zoomRouter.put('/updatezoom/:zoomId', zoom_controllers_1.ZoomsController.updatezoom);
zoomRouter.put('/updatezoomdate/:zoomId', zoom_controllers_1.ZoomsController.updatezoomdate);
//! zoom user
//! post
zoomRouter.post('/Adduserzoom', zoom_controllers_1.ZoomsController.addZoomuser);
//! get
zoomRouter.get('/checkuserzoom/:zoomMeetUserEmail', zoom_controllers_1.ZoomsController.checkUserZoomData);
zoomRouter.get('/fetchalluserzoom', zoom_controllers_1.ZoomsController.fetchallUserData);
//! delete
zoomRouter.delete('/removeAllUser', zoom_controllers_1.ZoomsController.removeAllUserZoomData);
