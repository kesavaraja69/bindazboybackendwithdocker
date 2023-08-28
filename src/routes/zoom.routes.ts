import Router from 'express';
import { ZoomsController } from '../controllers/zoom.controllers';
const zoomRouter = Router();

//! Zoom
//! post
zoomRouter.post('/Addzoom', ZoomsController.addZoom);

//! get
zoomRouter.get('/getzoomdetail', ZoomsController.fetchZoom);

//! update

zoomRouter.put(
  '/updatezoomsisenable/:zoomId',
  ZoomsController.updateZoomIsenable
);
zoomRouter.put('/updatezoomslot/:zoomId', ZoomsController.updatezoomSlot);
zoomRouter.put('/updatezoom/:zoomId', ZoomsController.updatezoom);
zoomRouter.put('/updatezoomdate/:zoomId', ZoomsController.updatezoomdate);

//! zoom user
//! post
zoomRouter.post('/Adduserzoom', ZoomsController.addZoomuser);

//! get
zoomRouter.get(
  '/checkuserzoom/:zoomMeetUserEmail',
  ZoomsController.checkUserZoomData
);
zoomRouter.get('/fetchalluserzoom', ZoomsController.fetchallUserData);

//! delete
zoomRouter.delete('/removeAllUser', ZoomsController.removeAllUserZoomData);
export { zoomRouter };
