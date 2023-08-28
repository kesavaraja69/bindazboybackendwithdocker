import { join } from 'path';
import { ConnectionOptions } from 'typeorm';
import dotenv from 'dotenv';
import { UserEntity } from './database/entity/user.entity';
import { BlogEntity } from './database/blogs/entity/blogs.entity';
import { ForgotPasswordEntity } from './database/forgotpassword/entity/forgotpassword.entity';
import { CatergoryEntity } from './database/category/entity/category.entity';
import { BookmarkBlogEntity } from './database/bookmark/entity/bookmark.entity';
import { AdminEntity } from './database/admin/entity/admin.entity';
import { AudiobookEntity } from './database/audiobooks/entity/audiobook.entity';
import { AudiobookchapterEntity } from './database/audio.chapter/entity/audiochapter.entity';
import { ViewsEntity } from './database/views/entity/view.entity';
import { ContactusEntity } from './database/contactus/enitiy/contactus.entity';
import { ZoomEntity } from './database/zoom/entity/zoom.entity';
import { ZoomUserEntity } from './database/zoom/entity/zoomuser.entity';

dotenv.config();
const connectionOptions: ConnectionOptions = {
  // url: process.env.DATABASE_URL,
  type: 'postgres',
  host: 'db',
  // host: 'localhost',
  port: 5432,
  username: 'ubuntu',
  password: 'kesava69isdragon',
  database: 'bindazboyappdb',
  // username: 'postgres',
  // password: 'dragon69',
  // database: 'bindazboyappdb',
  synchronize: !process.env.DB_NO_SYNC,
  logging: !process.env.DB_NO_LOGS,
  entities: [
    UserEntity,
    BlogEntity,
    ForgotPasswordEntity,
    CatergoryEntity,
    BookmarkBlogEntity,
    AdminEntity,
    AudiobookEntity,
    AudiobookchapterEntity,
    ViewsEntity,
    ContactusEntity,
    ZoomEntity,
    ZoomUserEntity,
  ],
  // extra: {
  //   ssl: {
  //     rejectUnauthorized: false,
  //   },
  // },
  dropSchema: false,
  migrationsRun: true,
  logger: 'debug',
  migrations: [join(__dirname, 'src/migration/**/*.ts')],
};

export = connectionOptions;
