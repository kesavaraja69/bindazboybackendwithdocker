"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
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
exports.BlogRepository = void 0;
const typeorm_1 = require("typeorm");
const blogs_entity_1 = require("../entity/blogs.entity");
const dotenv_1 = __importDefault(require("dotenv"));
const category_repository_1 = require("../../category/repo/category.repository");
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
dotenv_1.default.config();
let BlogRepository = class BlogRepository extends typeorm_1.Repository {
    //! add blogs in database
    addBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            if (admin_token === admin_secrect) {
                let { catergory_id } = req.params;
                let { blog_title, blog_description, blog_image, blog_category, blog_audio, blog_date, blog_images, } = req.body;
                let catergoryrepo = (0, typeorm_1.getCustomRepository)(category_repository_1.CategoryRepository);
                let parent_catergory = yield catergoryrepo.findOneBy({ catergory_id });
                let blogEntity = new blogs_entity_1.BlogEntity();
                blogEntity.blog_title = blog_title;
                blogEntity.blog_description = blog_description;
                blogEntity.blog_image = blog_image;
                blogEntity.blog_category = blog_category;
                blogEntity.blog_audio = blog_audio;
                blogEntity.blog_images = blog_images;
                blogEntity.blog_date = blog_date;
                blogEntity.blog_view = '0';
                blogEntity.catergorys = parent_catergory;
                yield blogEntity
                    .save()
                    .then((data) => {
                    // console.log(data);
                    return res.send({
                        code: 201,
                        message: 'Blog Added Sucessfully',
                        submitted: true,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 401,
                        message: null,
                        submitted: false,
                    });
                });
            }
            else {
                return res.send({
                    code: 409,
                    message: 'your not admin',
                    submitted: false,
                });
            }
        });
    }
    //! add images in imagekit.io
    imagekitioupload(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { filetype } = req.params;
            let storage;
            try {
                if (filetype == 'audio') {
                    storage = multer_1.default.diskStorage({
                        destination: function (req, file, cb) {
                            cb(null, './imageupload/audioblog');
                        },
                        filename: function (req, file, cb) {
                            cb(null, file.originalname);
                        },
                    });
                }
                else {
                    storage = multer_1.default.diskStorage({
                        destination: function (req, file, cb) {
                            cb(null, './imageupload/img');
                        },
                        filename: function (req, file, cb) {
                            cb(null, file.originalname);
                        },
                    });
                }
                const upload = (0, multer_1.default)({ storage: storage }).single('image');
                upload(req, res, (err) => {
                    var _a, _b;
                    if (err) {
                        res.send({
                            message: 'not uploaded',
                            data: null,
                            code: 302,
                        });
                    }
                    console.log(`file path ${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}`);
                    fs_1.default.readFile(`${(_b = req.file) === null || _b === void 0 ? void 0 : _b.path}`, 'utf8', function (err, data) {
                        var _a;
                        if (err)
                            throw err; // Fail if the file can't be read.
                        if (err) {
                            res.send({
                                message: 'not uploaded',
                                data: null,
                                code: 301,
                            });
                        }
                        res.send({
                            message: 'uplaod sucessfully',
                            data: `${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path.toString().replace('imageupload', '').toString().split('\\').join('/')}`,
                            code: 201,
                        });
                        //  console.log(req.file);
                        // imagekit.upload(
                        //   {
                        //     file: data, //required
                        //     fileName: `${req.file?.filename}`, //required
                        //   },
                        //   function (error, result) {
                        //   }
                        // );
                    });
                });
                // upload(req, res, (err) => {
                //   if (err) {
                //     res.send({
                //       message: "not uploaded",
                //       data: null,
                //       code: 302,
                //     });
                //   }
                //   console.log(`file path ${req.file?.path}`);
                //   fs.readFile(`${req.file?.path}`, function (err, data) {
                //     if (err) throw err; // Fail if the file can't be read.
                //     imagekit.upload(
                //       {
                //         file: data, //required
                //         fileName: `${req.file?.filename}`, //required
                //       },
                //       function (error, result) {
                //         if (error) {
                //           res.send({
                //             message: "not uploaded",
                //             data: null,
                //             code: 301,
                //           });
                //         }
                //         //  console.log(req.file);
                //         res.send({
                //           message: "uplaod sucessfully",
                //           data: result?.url,
                //           code: 201,
                //         });
                //       }
                //     );
                //   });
                // });
            }
            catch (error) {
                console.log(error);
                res.send({
                    message: 'not uploaded',
                    data: null,
                    code: 403,
                });
            }
        });
    }
    removefile(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { filetype, filename, deleteid, fileindex } = req.params;
            let myimageArrays = [];
            let iSfileremoved = false;
            let iSfileaudioremoved = false;
            let iSfileimgremoved = false;
            // const JSobj = JSON.parse();
            try {
                switch (filetype) {
                    case 'image':
                        fs_1.default.readFile(`./imageupload/img/${filename}`, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            if (data != undefined) {
                                iSfileimgremoved = true;
                                fs_1.default.rmSync(`./imageupload/img/${filename}`, {
                                    recursive: true,
                                });
                            }
                        });
                        break;
                    case 'images':
                        fs_1.default.readFile(`./imageupload/images/${filename}`, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            if (data != undefined) {
                                iSfileremoved = true;
                                fs_1.default.rmSync(`./imageupload/images/${filename}`, {
                                    recursive: true,
                                });
                            }
                        });
                        break;
                    case 'audio':
                        fs_1.default.readFile(`./imageupload/audioblog/${filename}`, function (err, data) {
                            if (err) {
                                console.log(err);
                            }
                            if (data != undefined) {
                                iSfileaudioremoved = true;
                                fs_1.default.rmSync(`./imageupload/audioblog/${filename}`, {
                                    recursive: true,
                                });
                            }
                        });
                        break;
                    default:
                        break;
                }
                // await this.createQueryBuilder("blogs")
                //   .delete()
                //   .where("blogs.blog_id = :deleteid", { deleteid })
                //   .andWhere("blogs.blog_images IN (:imagesblg)", { imagesblg: [fileindex] })
                //   .execute()
                //   .then((data: any) => {
                //     return res.send({
                //       deleted: true,
                //       data: data,
                //       message: "Deleted Sucessfully",
                //       code: 201,
                //     });
                //   });
                yield this.createQueryBuilder('blogs')
                    .select(['blogs.blog_images'])
                    .andWhere('blog_id = :deleteid', { deleteid: 1 })
                    .getOne()
                    .then((data) => __awaiter(this, void 0, void 0, function* () {
                    //   myimageArrays = `${data}`;
                    // const JSobj = JSON.parse(data);
                    // console.log(JSobj);
                    // //   console.log(typeof JSobj);
                    const JSON_string = JSON.stringify(data);
                    console.log(JSON_string);
                    let JSobj2 = JSON.parse(JSON_string);
                    //   console.log(`my images ${JSobj2.blog_images}`);
                    myimageArrays = JSobj2.blog_images;
                    //  console.log(`my images ary ${myimageArrays}`);
                    if (iSfileremoved == true) {
                        if (myimageArrays.length == 1) {
                            myimageArrays.pop();
                        }
                        else {
                            myimageArrays.splice(Number.parseInt(fileindex), 1);
                        }
                        console.log(`my images ary fn ${myimageArrays}`);
                        console.log(`my images ary fn removed ${iSfileremoved}`);
                        console.log(`my images ary fn ${myimageArrays}`);
                        yield this.createQueryBuilder()
                            .update(blogs_entity_1.BlogEntity)
                            .set({
                            blog_images: myimageArrays,
                        })
                            .where('blog_id = :deleteid', { deleteid })
                            .execute()
                            .then((data) => {
                            //  console.log(data);
                            return res.send({
                                code: 201,
                                message: 'Blog image updated Sucessfully',
                                submitted: true,
                            });
                        })
                            .catch((error) => {
                            //console.log(error);
                            return res.send({
                                code: 401,
                                message: null,
                                submitted: false,
                            });
                        });
                    }
                    else if (iSfileaudioremoved == true) {
                        return res.send({
                            data: null,
                            message: 'removed',
                            code: 201,
                        });
                    }
                    else {
                        return res.send({
                            data: null,
                            message: 'not removed',
                            code: 302,
                        });
                    }
                    // console.log(`my images ary fn ${myimageArrays}`);
                }));
                //  console.log(typeof JSON_string);
                // console.log(`my images ${JSobj2.myArrayslist2}`);
            }
            catch (error) {
                res.send({
                    message: 'not err deleted',
                    data: null,
                    code: 303,
                });
                //console.log(error);
            }
        });
    }
    imagekitiouploadimages(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { imagno } = req.params;
            let myArrays = [];
            // const sleep = (4000) => new Promise(r => setTimeout(r, ms));
            let myArrayslist = [];
            let storage;
            try {
                // //  const upload = multer({ storage: storage })
                // storage = multer.diskStorage({
                //   destination: function (req, file, cb) {
                //     cb(null, "./imageupload");
                //   },
                //   filename: function (req, file, cb) {
                //     cb(null, "techking.jpg");
                //   },
                // });
                storage = multer_1.default.diskStorage({
                    destination: function (req, file, cb) {
                        cb(null, './imageupload/images');
                    },
                    filename: function (req, file, cb) {
                        cb(null, file.originalname);
                        console.log(`file path ${file.originalname}`);
                        //  myArrayslist.push(file.path);
                    },
                });
                let upload = (0, multer_1.default)({ storage: storage }).array('images', Number(imagno));
                upload(req, res, (err) => __awaiter(this, void 0, void 0, function* () {
                    if (err) {
                        res.send({
                            message: 'not uploaded',
                            data: null,
                            code: 305,
                        });
                    }
                    console.log(`file path ${req.files}`);
                    myArrayslist.push(req.files);
                    // res.send({
                    //   message: "uplaod sucessfully",
                    //   data: req.files,
                    //   code: 201,
                    // });
                    //   const JSobj = JSON.parse();
                    // console.log(JSobj);
                    // console.log(typeof JSobj);
                    const JSON_string = JSON.stringify({ myArrayslist });
                    console.log(JSON_string);
                    let JSobj = JSON.parse(JSON_string);
                    // console.log(JSobj.myArrayslist[0][0].path);
                    // res.send({
                    //   message: "uplaod sucessfully",
                    //   data: req.files,
                    //   code: 201,
                    // });
                    // for (let i = 0; i < JSobj.myArrayslist[0].length; i++) {
                    //   // console.log("Block statement execution no." + i);
                    // }
                    if (JSobj.myArrayslist[0] !== undefined) {
                        JSobj.myArrayslist[0].forEach((element, index, arrays) => __awaiter(this, void 0, void 0, function* () {
                            var data = JSobj.myArrayslist[0][index].path;
                            console.log('final path is ' + data);
                            fs_1.default.readFile(JSobj.myArrayslist[0][index].path, function (err, data) {
                                var _a;
                                if (err)
                                    throw err;
                                // Fail if the file can't be read.
                                myArrays.push(JSobj.myArrayslist[0][index].path
                                    .toString()
                                    .replace('imageupload', '')
                                    .toString()
                                    .split('\\')
                                    .join('/'));
                                if (index === arrays.length - 1) {
                                    if (myArrays != null) {
                                        new Promise((f) => setTimeout(f, 2000));
                                        res.send({
                                            code: 201,
                                            message: 'file uploaded',
                                            imagedatalength: (_a = req.files) === null || _a === void 0 ? void 0 : _a.length,
                                            data: myArrays,
                                            recivied: true,
                                        });
                                    }
                                }
                            });
                            // fs.readFile(
                            //   JSobj.myArrayslist[0][index].path,
                            //   function (err, data) {
                            //     if (err) throw err; // Fail if the file can't be read.
                            //     imagekit.upload(
                            //       {
                            //         file: data, //required
                            //         fileName: `${JSobj.myArrayslist[0][index].filename}`, //required
                            //       },
                            //       async function (error, result) {
                            //         if (error) {
                            //           res.send({
                            //             code: 306,
                            //             message: "file not upload",
                            //             data: null,
                            //           });
                            //           console.log(`aws err ${err}`);
                            //         } else {
                            //           myArrays.push(result?.url);
                            //           if (index === arrays.length - 1) {
                            //             if (result?.url != null) {
                            //               await new Promise((f) => setTimeout(f, 2000));
                            //               res.send({
                            //                 code: 201,
                            //                 message: "file uploaded",
                            //                 imagedatalength: req.files?.length,
                            //                 data: myArrays,
                            //                 recivied: true,
                            //               });
                            //               //  await sleep();
                            //               //   console.log("loop is closed");
                            //               await new Promise((f) => setTimeout(f, 1000));
                            //               fs.rmSync("./imageupload/images", {
                            //                 recursive: true,
                            //               });
                            //               await new Promise((f) => setTimeout(f, 1000));
                            //               console.log("done");
                            //               fs.access("./imageupload/images", (error) => {
                            //                 // To check if the given directory
                            //                 // already exists or not
                            //                 if (error) {
                            //                   // If current directory does not exist
                            //                   // then create it
                            //                   fs.mkdir("./imageupload/images", (error) => {
                            //                     if (error) {
                            //                       console.log(error);
                            //                     } else {
                            //                       console.log(
                            //                         "New Directory created successfully !!"
                            //                       );
                            //                     }
                            //                   });
                            //                 } else {
                            //                   console.log("Given Directory already exists !!");
                            //                 }
                            //               });
                            //             }
                            //           }
                            //         }
                            //         // console.log(`aws array ${myArrays}`);
                            //       }
                            //     );
                            //   }
                            // );
                        }));
                    }
                    else {
                        res.send({
                            message: 'not uploaded',
                            data: null,
                            code: 303,
                        });
                    }
                }));
            }
            catch (error) {
                res.send({
                    message: 'not error uploaded',
                    data: null,
                    code: 403,
                });
            }
        });
    }
    imageuploadtoStorageserver(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { filetype, imagno } = req.params;
            let myArrays = [];
            let myArrayslist = [];
            const ftp = require('basic-ftp');
            var FTPStorage = require('multer-ftp');
            ftp.verbose = true;
            try {
                if (filetype == 'postimages') {
                    const upload = (0, multer_1.default)({
                        storage: new FTPStorage({
                            basepath: '/remote',
                            ftp: {
                                host: process.env.DRFTPHost,
                                user: process.env.DRFTPUser,
                                password: process.env.DRFTPPwd,
                                secure: false,
                            },
                            destination: function (req, file, options, callback) {
                                const path = '/Postimages/' + Date.now() + file.originalname;
                                callback(null, path);
                            },
                        }),
                    }).array('images', Number(imagno));
                    upload(req, res, (err) => {
                        if (err) {
                            res.send({
                                message: 'not uploaded',
                                data: null,
                                code: 302,
                            });
                        }
                        console.log(`file path ${req.files}`);
                        myArrayslist.push(req.files);
                        const JSON_string = JSON.stringify({ myArrayslist });
                        console.log(JSON_string);
                        let JSobj = JSON.parse(JSON_string);
                        if (JSobj.myArrayslist[0] !== undefined) {
                            JSobj.myArrayslist[0].forEach((element, index, arrays) => __awaiter(this, void 0, void 0, function* () {
                                var _a;
                                var data = JSobj.myArrayslist[0][index].path;
                                console.log('final path is ' + data);
                                myArrays.push(`https://dragonfistztamilan.in/bindazboyapp${JSobj.myArrayslist[0][index].path}`);
                                if (index === arrays.length - 1) {
                                    if (myArrays != null) {
                                        new Promise((f) => setTimeout(f, 2000));
                                        res.send({
                                            code: 201,
                                            message: 'file uploaded',
                                            imagedatalength: (_a = req.files) === null || _a === void 0 ? void 0 : _a.length,
                                            data: myArrays,
                                            recivied: true,
                                        });
                                    }
                                }
                            }));
                            // res.send({
                            //   code: 201,
                            //   message: 'file uploaded',
                            //   imagedatalength: req.files?.length,
                            //   data: JSobj.myArrayslist[0],
                            //   recivied: true,
                            // });
                        }
                        else {
                            res.send({
                                message: 'not uploaded',
                                data: null,
                                code: 303,
                            });
                        }
                    });
                }
                else {
                    const upload = (0, multer_1.default)({
                        storage: new FTPStorage({
                            basepath: '/remote',
                            ftp: {
                                host: process.env.DRFTPHost,
                                user: process.env.DRFTPUser,
                                password: process.env.DRFTPPwd,
                                secure: false,
                            },
                            destination: function (req, file, options, callback) {
                                if (filetype == 'postaudio') {
                                    //  const path = '/picfinal/test/' + Date.now() + file.originalname;
                                    const path = '/PostAudio/' + Date.now() + file.originalname;
                                    callback(null, path);
                                }
                                else if (filetype == 'profilepic') {
                                    const path = '/ProfilePics/' + Date.now() + file.originalname;
                                    callback(null, path);
                                }
                                else if (filetype == 'postbgimage') {
                                    const path = '/Postbackgroundimage/' + Date.now() + file.originalname;
                                    callback(null, path);
                                }
                                //  const path = '/Fullscreenvideo/' + Date.now() + file.originalname;
                            },
                        }),
                    }).single('image');
                    upload(req, res, (err) => {
                        var _a;
                        if (err) {
                            res.send({
                                message: 'not uploaded',
                                data: null,
                                code: 302,
                            });
                        }
                        res.send({
                            message: 'uploaded',
                            data: `https://dragonfistztamilan.in/bindazboyapp${(_a = req.file) === null || _a === void 0 ? void 0 : _a.path}`,
                            code: 201,
                        });
                    });
                }
            }
            catch (err) {
                console.log(err);
                if (err) {
                    res.send({
                        message: 'not uploaded',
                        data: null,
                        code: 402,
                    });
                }
            }
        });
    }
    //! update blogs in database
    updateBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            let { blogupdate_id } = req.params;
            let { blog_title, blog_description, blog_image, blog_category, blog_audio, blog_images, blog_date, } = req.body;
            if (admin_token === admin_secrect) {
                yield this.createQueryBuilder()
                    .update(blogs_entity_1.BlogEntity)
                    .set({
                    blog_title,
                    blog_description,
                    blog_image,
                    blog_category,
                    blog_audio,
                    blog_images,
                    blog_date,
                })
                    .where('blog_id = :blogupdate_id', { blogupdate_id })
                    .execute()
                    .then((data) => {
                    //  console.log(data);
                    return res.send({
                        code: 201,
                        message: 'Blog updated Sucessfully',
                        submitted: true,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 401,
                        message: null,
                        submitted: false,
                    });
                });
            }
        });
    }
    //! update blogs in database
    updateimageBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            let { blogupdate_id } = req.params;
            let { blog_image } = req.body;
            if (admin_token === admin_secrect) {
                yield this.createQueryBuilder()
                    .update(blogs_entity_1.BlogEntity)
                    .set({
                    blog_image,
                })
                    .where('blog_id = :blogupdate_id', { blogupdate_id })
                    .execute()
                    .then((data) => {
                    //  console.log(data);
                    return res.send({
                        code: 201,
                        message: 'Blog image updated Sucessfully',
                        submitted: true,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 401,
                        message: null,
                        submitted: false,
                    });
                });
            }
        });
    }
    //! update blog audio in database
    updateaudioBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            let { blogupdate_id } = req.params;
            let { blog_audio } = req.body;
            if (admin_token === admin_secrect) {
                yield this.createQueryBuilder()
                    .update(blogs_entity_1.BlogEntity)
                    .set({
                    blog_audio,
                })
                    .where('blog_id = :blogupdate_id', { blogupdate_id })
                    .execute()
                    .then((data) => {
                    //  console.log(data);
                    return res.send({
                        code: 201,
                        message: 'Blog audio updated Sucessfully',
                        submitted: true,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 401,
                        message: null,
                        submitted: false,
                    });
                });
            }
        });
    }
    //! update post views
    addviewpost(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { blog_id } = req.params;
            let { blog_view } = req.body;
            yield this.createQueryBuilder()
                .update(blogs_entity_1.BlogEntity)
                .set({
                blog_view,
            })
                .where('blogs.blog_id = :blog_id', { blog_id })
                .execute()
                .then((data) => {
                var isAffected = data.affected;
                if (isAffected > 0) {
                    return res.send({
                        code: 201,
                        message: 'updated Sucessfully',
                        submitted: true,
                    });
                }
                else {
                    return res.send({
                        code: 301,
                        message: 'not updated',
                        submitted: false,
                    });
                }
            })
                .catch((error) => {
                console.log(error);
                return res.send({
                    code: 401,
                    message: 'something went wrong',
                    submitted: false,
                });
            });
        });
    }
    //! update blog images in database
    updateimagesBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let admin_token = req.headers.authorization;
            let admin_secrect = process.env.ADMIN_SECRECT;
            let { blogupdate_id } = req.params;
            let { blog_images } = req.body;
            if (admin_token === admin_secrect) {
                yield this.createQueryBuilder()
                    .update(blogs_entity_1.BlogEntity)
                    .set({
                    blog_images,
                })
                    .where('blog_id = :blogupdate_id', { blogupdate_id })
                    .execute()
                    .then((data) => {
                    //   console.log(data);
                    return res.send({
                        code: 201,
                        message: 'Blog images updated Sucessfully',
                        submitted: true,
                    });
                })
                    .catch((error) => {
                    console.log(error);
                    return res.send({
                        code: 401,
                        message: null,
                        submitted: false,
                    });
                });
            }
        });
    }
    //! fetch All blogs in database
    fetchBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let blogs = yield this.createQueryBuilder('blogs')
                .select()
                .orderBy('blogs.blog_id', 'DESC')
                .getMany();
            try {
                if (blogs !== undefined) {
                    return res.send({
                        received: true,
                        data: blogs,
                        code: 200,
                    });
                }
                else {
                    return res.send({
                        received: true,
                        message: 'no blogs add please',
                        code: 402,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        received: false,
                        message: null,
                        code: 403,
                    });
                }
            }
        });
    }
    //! fetch All blogs with limit pagination in database
    fetchBlogswithlimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let peritem = 9;
            let { pageno } = req.params;
            let blogs = yield this.createQueryBuilder('blogs')
                .select()
                .orderBy('blogs.blog_id', 'DESC')
                .offset((parseInt(pageno) - 1) * peritem)
                .limit(peritem)
                .getMany();
            let blogscount = yield this.createQueryBuilder('blogs')
                .select()
                .orderBy('blogs.blog_id', 'DESC')
                .getCount();
            try {
                if (blogs !== undefined) {
                    return res.send({
                        received: true,
                        data: blogs,
                        totalcount: blogscount,
                        code: 200,
                    });
                }
                else {
                    return res.send({
                        received: true,
                        message: 'no blogs add please',
                        totalcount: 0,
                        code: 402,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        received: false,
                        message: 'something went wrong blogs',
                        totalcount: 0,
                        code: 403,
                    });
                }
            }
        });
    }
    //! fetch Category blogs in database
    categoryBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { category } = req.params;
            try {
                let blogcategory = yield this.createQueryBuilder('blogs')
                    .select()
                    .where('blogs.blog_category = :category', { category })
                    .getMany();
                if (blogcategory !== undefined) {
                    return res.send({
                        received: true,
                        data: blogcategory,
                        code: 200,
                    });
                }
                else {
                    return res.send({
                        received: true,
                        data: null,
                        code: 200,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        received: false,
                        data: null,
                        code: 403,
                    });
                }
            }
        });
    }
    fetchCategoryblogswithlimit(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let peritem = 9;
            let { catergory_title, pageno } = req.params;
            try {
                let blogcategory = yield this.createQueryBuilder('blogs')
                    .leftJoinAndSelect('blogs.catergorys', 'catergory')
                    .where('blogs.blog_category = :catergory_title', { catergory_title })
                    .offset((parseInt(pageno) - 1) * peritem)
                    .limit(peritem)
                    .getMany();
                let blogcategorycount = yield this.createQueryBuilder('blogs')
                    .leftJoinAndSelect('blogs.catergorys', 'catergory')
                    .where('blogs.blog_category = :catergory_title', { catergory_title })
                    .getCount();
                if (blogcategory !== undefined) {
                    return res.send({
                        data: blogcategory,
                        totalcount: blogcategorycount,
                        code: 200,
                        received: true,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        data: null,
                        code: 401,
                        totalcount: 0,
                        received: false,
                    });
                }
            }
        });
    }
    //! fetch blogs Details in database
    loadingBlogsDetail(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { detailid } = req.params;
            try {
                let blogDetails = yield this.createQueryBuilder('blogs')
                    .select()
                    .where('blogs.blog_id = :detailid', { detailid })
                    .getOne();
                if (blogDetails !== undefined) {
                    return res.send({
                        data: blogDetails,
                        received: true,
                        code: 200,
                    });
                }
                else {
                    return res.send({
                        data: 'No details Available',
                        received: true,
                        code: 402,
                    });
                }
            }
            catch (error) {
                if (error) {
                    console.log(error);
                    return res.send({
                        data: 'Something went wrong ,try agian',
                        received: false,
                        code: 403,
                    });
                }
            }
        });
    }
    //! delete blog in database
    deleteBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { deleteid } = req.params;
            let admin_secrect = process.env.ADMIN_SECRECT;
            let admin_token = req.headers.authorization;
            try {
                if (admin_secrect === admin_token) {
                    yield this.createQueryBuilder('blogs')
                        .delete()
                        .where('blogs.blog_id = :deleteid', { deleteid })
                        .execute()
                        .then((data) => {
                        return res.send({
                            deleted: true,
                            data: data,
                            message: 'Deleted Sucessfully',
                            code: 201,
                        });
                    });
                }
                else {
                    return res.send({
                        deleted: false,
                        message: 'Failed ,your not Admin',
                        code: 302,
                    });
                }
            }
            catch (error) {
                if (error) {
                    return res.send({
                        deleted: false,
                        message: 'something went wrong',
                        code: 402,
                    });
                }
            }
        });
    }
    //! search blog in database
    searchBlogs(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { query } = req.params;
            try {
                var result = yield this.createQueryBuilder('blogs')
                    .select()
                    .where('blogs.blog_title ILIKE :query', { query: `%${query}%` })
                    .getMany();
                if (result !== undefined) {
                    return res.send({
                        code: 200,
                        data: result,
                    });
                }
            }
            catch (error) {
                if (error) {
                    return res.send({
                        code: 402,
                        data: error,
                    });
                }
            }
        });
    }
    deleteimageBlog(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            let { deleteid } = req.params;
            let admin_secrect = process.env.ADMIN_SECRECT;
            let admin_token = req.headers.authorization;
            try {
                if (admin_secrect === admin_token) {
                    yield this.createQueryBuilder('blogs')
                        .delete()
                        .where('blogs.blog_image = :deleteid', { deleteid })
                        .execute()
                        .then((data) => {
                        return res.send({
                            deleted: true,
                            data: data,
                            message: 'Deleted Sucessfully',
                            code: 201,
                        });
                    });
                }
                else {
                    return res.send({
                        deleted: false,
                        message: 'Failed ,your not Admin',
                        code: 302,
                    });
                }
            }
            catch (error) {
                if (error) {
                    return res.send({
                        deleted: false,
                        message: 'something went wrong',
                        code: 402,
                    });
                }
            }
        });
    }
};
BlogRepository = __decorate([
    (0, typeorm_1.EntityRepository)(blogs_entity_1.BlogEntity)
], BlogRepository);
exports.BlogRepository = BlogRepository;
