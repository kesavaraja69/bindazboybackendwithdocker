"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const path_1 = require("path");
const dotenv_1 = __importDefault(require("dotenv"));
const user_entity_1 = require("./database/entity/user.entity");
const blogs_entity_1 = require("./database/blogs/entity/blogs.entity");
const forgotpassword_entity_1 = require("./database/forgotpassword/entity/forgotpassword.entity");
const category_entity_1 = require("./database/category/entity/category.entity");
const bookmark_entity_1 = require("./database/bookmark/entity/bookmark.entity");
const admin_entity_1 = require("./database/admin/entity/admin.entity");
const audiobook_entity_1 = require("./database/audiobooks/entity/audiobook.entity");
const audiochapter_entity_1 = require("./database/audio.chapter/entity/audiochapter.entity");
const view_entity_1 = require("./database/views/entity/view.entity");
const contactus_entity_1 = require("./database/contactus/enitiy/contactus.entity");
const zoom_entity_1 = require("./database/zoom/entity/zoom.entity");
const zoomuser_entity_1 = require("./database/zoom/entity/zoomuser.entity");
dotenv_1.default.config();
const connectionOptions = {
    // url: process.env.DATABASE_URL,
    type: 'postgres',
    host: process.env.Host || 'localhost',
    port: 5432,
    username: process.env.User || 'postgres',
    password: process.env.DB_Password || 'dragon69',
    database: process.env.Database || 'bindazboyappdb',
    synchronize: !process.env.DB_NO_SYNC,
    logging: !process.env.DB_NO_LOGS,
    entities: [
        user_entity_1.UserEntity,
        blogs_entity_1.BlogEntity,
        forgotpassword_entity_1.ForgotPasswordEntity,
        category_entity_1.CatergoryEntity,
        bookmark_entity_1.BookmarkBlogEntity,
        admin_entity_1.AdminEntity,
        audiobook_entity_1.AudiobookEntity,
        audiochapter_entity_1.AudiobookchapterEntity,
        view_entity_1.ViewsEntity,
        contactus_entity_1.ContactusEntity,
        zoom_entity_1.ZoomEntity,
        zoomuser_entity_1.ZoomUserEntity,
    ],
    // extra: {
    //   ssl: {
    //     rejectUnauthorized: false,
    //   },
    // },
    dropSchema: false,
    migrationsRun: true,
    logger: 'debug',
    migrations: [(0, path_1.join)(__dirname, 'src/migration/**/*.ts')],
};
module.exports = connectionOptions;
