import express from 'express';
import cors from 'cors';
import http from 'http';
import 'reflect-metadata';
import { authenticationRouter } from './routes/authentication.routes';
import { ConnectionOptions, createConnection } from 'typeorm';
import config from './ormconfig';
import { blogRouter } from './routes/blogs.routes';
import { ForgotPassRouter } from './routes/forgotpassword.routes';
import { categoryRouter } from './routes/categorys.routes';
import { bookmarkBlogRouter } from './routes/bookmarks.routes';
import { adminauthenticationRouter } from './routes/adminauthentication.routes';
import { router } from './routes/router.routes';
import { notificationRouter } from './routes/notification.routes';
import { audiobookRouter } from './routes/audiobook.routes';
import { audiobookchapterRouter } from './routes/audiobookchapter.routes';
import { viewsRouter } from './routes/views.routes';
import { contactusRouter } from './routes/contactus.routes';
import { zoomRouter } from './routes/zoom.routes';

createConnection(config as ConnectionOptions).then(async (connection) => {
  if (connection.isConnected) {
    console.log('postgressql is connected');
  }

  const app = express();
  const port = process.env.PORT || 8181;

  let server = http.createServer(app);

  let io = require('socket.io')(server);

  io.on('connection', (sockcet: any) => {
    let count = 0;
    try {
      console.log('sock connected');
      sockcet.on('addonlineuser', (user: any) => {
        count++;
        io.emit('onlineuser', count);
        console.log('user is connected');
        //  console.log(`count is ${count}`);
      });
      sockcet.on('disconnect', (data: any) => {
        if (count === 0) {
          count = 0;
          io.emit('onlineuser', count);
          // console.log("user is disconnected");
          // console.log(`count is ${count}`);
        } else {
          count--;
          io.emit('onlineuser', count);
          // console.log("user is disconnected");
          //  console.log(`count is ${count}`);
        }
      });
    } catch (error) {
      console.log('socket error');
    }
  });

  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use('/api2', router);
  app.use('/api2/notification', notificationRouter);
  app.use('/api2/user', authenticationRouter);
  app.use('/api2/blogs', blogRouter);
  app.use('/api2/forgotpassword', ForgotPassRouter);
  app.use('/api2/catergory', categoryRouter);
  app.use('/api2/audiobookchapter', audiobookchapterRouter);
  app.use('/api2/bookmark', bookmarkBlogRouter);
  app.use('/api2/audiobook', audiobookRouter);
  app.use('/api2/views', viewsRouter);
  app.use('/api2/admin/auth', adminauthenticationRouter);
  app.use('/api2/contactusandreport', contactusRouter);
  app.use('/api2/zoomall', zoomRouter);
  app.use('/api2/', express.static('imageupload'));

  app.set('port', port);

  // app.listen(app.get("port"), () => {
  //   console.log(`server rocking at ${app.get("port")}`);
  // });

  server.listen(app.get('port'), () => {
    console.log(`server socket is rocking at ${app.get('port')}`);
  });
});
