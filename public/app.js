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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const http_1 = __importDefault(require("http"));
require("reflect-metadata");
const authentication_routes_1 = require("./routes/authentication.routes");
const typeorm_1 = require("typeorm");
const ormconfig_1 = __importDefault(require("./ormconfig"));
const blogs_routes_1 = require("./routes/blogs.routes");
const forgotpassword_routes_1 = require("./routes/forgotpassword.routes");
const categorys_routes_1 = require("./routes/categorys.routes");
const bookmarks_routes_1 = require("./routes/bookmarks.routes");
const adminauthentication_routes_1 = require("./routes/adminauthentication.routes");
const router_routes_1 = require("./routes/router.routes");
const notification_routes_1 = require("./routes/notification.routes");
const audiobook_routes_1 = require("./routes/audiobook.routes");
const audiobookchapter_routes_1 = require("./routes/audiobookchapter.routes");
const views_routes_1 = require("./routes/views.routes");
const contactus_routes_1 = require("./routes/contactus.routes");
const zoom_routes_1 = require("./routes/zoom.routes");
(0, typeorm_1.createConnection)(ormconfig_1.default).then((connection) => __awaiter(void 0, void 0, void 0, function* () {
    if (connection.isConnected) {
        console.log('postgressql is connected');
    }
    const app = (0, express_1.default)();
    const port = process.env.PORT || 8181;
    let server = http_1.default.createServer(app);
    let io = require('socket.io')(server);
    io.on('connection', (sockcet) => {
        let count = 0;
        try {
            console.log('sock connected');
            sockcet.on('addonlineuser', (user) => {
                count++;
                io.emit('onlineuser', count);
                console.log('user is connected');
                //  console.log(`count is ${count}`);
            });
            sockcet.on('disconnect', (data) => {
                if (count === 0) {
                    count = 0;
                    io.emit('onlineuser', count);
                    // console.log("user is disconnected");
                    // console.log(`count is ${count}`);
                }
                else {
                    count--;
                    io.emit('onlineuser', count);
                    // console.log("user is disconnected");
                    //  console.log(`count is ${count}`);
                }
            });
        }
        catch (error) {
            console.log('socket error');
        }
    });
    app.use((0, cors_1.default)());
    app.use(express_1.default.json());
    app.use(express_1.default.urlencoded({ extended: false }));
    app.use('/api2', router_routes_1.router);
    app.use('/api2/notification', notification_routes_1.notificationRouter);
    app.use('/api2/user', authentication_routes_1.authenticationRouter);
    app.use('/api2/blogs', blogs_routes_1.blogRouter);
    app.use('/api2/forgotpassword', forgotpassword_routes_1.ForgotPassRouter);
    app.use('/api2/catergory', categorys_routes_1.categoryRouter);
    app.use('/api2/audiobookchapter', audiobookchapter_routes_1.audiobookchapterRouter);
    app.use('/api2/bookmark', bookmarks_routes_1.bookmarkBlogRouter);
    app.use('/api2/audiobook', audiobook_routes_1.audiobookRouter);
    app.use('/api2/views', views_routes_1.viewsRouter);
    app.use('/api2/admin/auth', adminauthentication_routes_1.adminauthenticationRouter);
    app.use('/api2/contactusandreport', contactus_routes_1.contactusRouter);
    app.use('/api2/zoomall', zoom_routes_1.zoomRouter);
    app.use('/api2/', express_1.default.static('imageupload'));
    app.set('port', port);
    // app.listen(app.get("port"), () => {
    //   console.log(`server rocking at ${app.get("port")}`);
    // });
    server.listen(app.get('port'), () => {
        console.log(`server socket is rocking at ${app.get('port')}`);
    });
}));
