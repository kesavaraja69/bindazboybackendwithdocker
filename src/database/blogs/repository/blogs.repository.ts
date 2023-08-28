import { EntityRepository, getCustomRepository, Repository } from 'typeorm';
import { BlogEntity } from '../entity/blogs.entity';
import { Response, Request } from 'express';
import dotenv from 'dotenv';
import { CategoryRepository } from '../../category/repo/category.repository';
import multer from 'multer';
import fs from 'fs';
import { Root } from '../../../models/imagesdt';
import { MyArraysimglist } from '../../../models/fileimage';

dotenv.config();
@EntityRepository(BlogEntity)
export class BlogRepository extends Repository<BlogEntity> {
  //! add blogs in database
  async addBlogs(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;

    if (admin_token === admin_secrect) {
      let { catergory_id } = req.params;
      let {
        blog_title,
        blog_description,
        blog_image,
        blog_category,
        blog_audio,
        blog_date,
        blog_images,
      } = req.body;

      let catergoryrepo = getCustomRepository(CategoryRepository);
      let parent_catergory = await catergoryrepo.findOne({ catergory_id });

      let blogEntity = new BlogEntity();

      blogEntity.blog_title = blog_title;
      blogEntity.blog_description = blog_description;
      blogEntity.blog_image = blog_image;
      blogEntity.blog_category = blog_category;
      blogEntity.blog_audio = blog_audio;
      blogEntity.blog_images = blog_images;
      blogEntity.blog_date = blog_date;
      blogEntity.blog_view = '0';
      blogEntity.catergorys = parent_catergory!;

      await blogEntity
        .save()
        .then((data: any) => {
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
    } else {
      return res.send({
        code: 409,
        message: 'your not admin',
        submitted: false,
      });
    }
  }

  //! add images in imagekit.io
  async imagekitioupload(req: Request, res: Response) {
    let { filetype } = req.params;
    let storage;

    try {
      if (filetype == 'audio') {
        storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './imageupload/audioblog');
          },
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          },
        });
      } else {
        storage = multer.diskStorage({
          destination: function (req, file, cb) {
            cb(null, './imageupload/img');
          },
          filename: function (req, file, cb) {
            cb(null, file.originalname);
          },
        });
      }

      const upload = multer({ storage: storage }).single('image');

      upload(req, res, (err) => {
        if (err) {
          res.send({
            message: 'not uploaded',
            data: null,
            code: 302,
          });
        }
        console.log(`file path ${req.file?.path}`);
        fs.readFile(`${req.file?.path}`, 'utf8', function (err, data) {
          if (err) throw err; // Fail if the file can't be read.
          if (err) {
            res.send({
              message: 'not uploaded',
              data: null,
              code: 301,
            });
          }
          res.send({
            message: 'uplaod sucessfully',
            data: `${req.file?.path
              .toString()
              .replace('imageupload', '')
              .toString()
              .split('\\')
              .join('/')}`,
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
    } catch (error) {
      console.log(error);
      res.send({
        message: 'not uploaded',
        data: null,
        code: 403,
      });
    }
  }

  async removefile(req: Request, res: Response) {
    let { filetype, filename, deleteid, fileindex } = req.params;

    let myimageArrays: Array<any> = [];

    let iSfileremoved: Boolean = false;

    let iSfileaudioremoved: Boolean = false;

    let iSfileimgremoved: Boolean = false;
    // const JSobj = JSON.parse();

    try {
      switch (filetype) {
        case 'image':
          fs.readFile(`./imageupload/img/${filename}`, function (err, data) {
            if (err) {
              console.log(err);
            }
            if (data != undefined) {
              iSfileimgremoved = true;
              fs.rmSync(`./imageupload/img/${filename}`, {
                recursive: true,
              });
            }
          });
          break;
        case 'images':
          fs.readFile(`./imageupload/images/${filename}`, function (err, data) {
            if (err) {
              console.log(err);
            }
            if (data != undefined) {
              iSfileremoved = true;
              fs.rmSync(`./imageupload/images/${filename}`, {
                recursive: true,
              });
            }
          });
          break;
        case 'audio':
          fs.readFile(
            `./imageupload/audioblog/${filename}`,
            function (err, data) {
              if (err) {
                console.log(err);
              }
              if (data != undefined) {
                iSfileaudioremoved = true;
                fs.rmSync(`./imageupload/audioblog/${filename}`, {
                  recursive: true,
                });
              }
            }
          );
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

      await this.createQueryBuilder('blogs')
        .select(['blogs.blog_images'])
        .andWhere('blog_id = :deleteid', { deleteid: 1 })
        .getOne()
        .then(async (data: any) => {
          //   myimageArrays = `${data}`;

          // const JSobj = JSON.parse(data);

          // console.log(JSobj);
          // //   console.log(typeof JSobj);

          const JSON_string = JSON.stringify(data);

          console.log(JSON_string);

          let JSobj2: MyArraysimglist = JSON.parse(JSON_string);
          //   console.log(`my images ${JSobj2.blog_images}`);
          myimageArrays = JSobj2.blog_images;
          //  console.log(`my images ary ${myimageArrays}`);

          if (iSfileremoved == true) {
            if (myimageArrays.length == 1) {
              myimageArrays.pop();
            } else {
              myimageArrays.splice(Number.parseInt(fileindex), 1);
            }

            console.log(`my images ary fn ${myimageArrays}`);

            console.log(`my images ary fn removed ${iSfileremoved}`);
            console.log(`my images ary fn ${myimageArrays}`);
            await this.createQueryBuilder()
              .update(BlogEntity)
              .set({
                blog_images: myimageArrays,
              })
              .where('blog_id = :deleteid', { deleteid })
              .execute()
              .then((data: any) => {
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
          } else if (iSfileaudioremoved == true) {
            return res.send({
              data: null,
              message: 'removed',
              code: 201,
            });
          } else {
            return res.send({
              data: null,
              message: 'not removed',
              code: 302,
            });
          }

          // console.log(`my images ary fn ${myimageArrays}`);
        });

      //  console.log(typeof JSON_string);

      // console.log(`my images ${JSobj2.myArrayslist2}`);
    } catch (error) {
      res.send({
        message: 'not err deleted',
        data: null,
        code: 303,
      });
      //console.log(error);
    }
  }

  async imagekitiouploadimages(req: Request, res: Response) {
    let { imagno } = req.params;
    let myArrays: Array<any> = [];
    // const sleep = (4000) => new Promise(r => setTimeout(r, ms));
    let myArrayslist: Array<any> = [];

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

      storage = multer.diskStorage({
        destination: function (req, file, cb) {
          cb(null, './imageupload/images');
        },
        filename: function (req, file, cb) {
          cb(null, file.originalname);

          console.log(`file path ${file.originalname}`);
          //  myArrayslist.push(file.path);
        },
      });

      let upload = multer({ storage: storage }).array('images', Number(imagno));
      upload(req, res, async (err) => {
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

        let JSobj: Root = JSON.parse(JSON_string);

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
          JSobj.myArrayslist[0].forEach(async (element, index, arrays) => {
            var data = JSobj.myArrayslist[0][index].path;

            console.log('final path is ' + data);
            fs.readFile(
              JSobj.myArrayslist[0][index].path,
              function (err, data) {
                if (err) throw err;
                // Fail if the file can't be read.
                myArrays.push(
                  JSobj.myArrayslist[0][index].path
                    .toString()
                    .replace('imageupload', '')
                    .toString()
                    .split('\\')
                    .join('/')
                );
                if (index === arrays.length - 1) {
                  if (myArrays != null) {
                    new Promise((f) => setTimeout(f, 2000));
                    res.send({
                      code: 201,
                      message: 'file uploaded',
                      imagedatalength: req.files?.length,
                      data: myArrays,
                      recivied: true,
                    });
                  }
                }
              }
            );

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
          });
        } else {
          res.send({
            message: 'not uploaded',
            data: null,
            code: 303,
          });
        }
      });
    } catch (error) {
      res.send({
        message: 'not error uploaded',
        data: null,
        code: 403,
      });
    }
  }

  async imageuploadtoStorageserver(req: Request, res: Response) {
    let { filetype, imagno } = req.params;
    let myArrays: Array<any> = [];

    let myArrayslist: Array<any> = [];

    const ftp = require('basic-ftp');
    var FTPStorage = require('multer-ftp');

    ftp.verbose = true;

    try {
      if (filetype == 'postimages') {
        const upload = multer({
          storage: new FTPStorage({
            basepath: '/remote',
            ftp: {
              host: process.env.DRFTPHost,
              user: process.env.DRFTPUser,
              password: process.env.DRFTPPwd,
              secure: false,
            },
            destination: function (
              req: Request,
              file: any,
              options: any,
              callback: any
            ) {
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
          let JSobj: Root = JSON.parse(JSON_string);

          if (JSobj.myArrayslist[0] !== undefined) {
            JSobj.myArrayslist[0].forEach(async (element, index, arrays) => {
              var data = JSobj.myArrayslist[0][index].path;

              console.log('final path is ' + data);

              myArrays.push(
                `https://dragonfistztamilan.in/bindazboyapp${JSobj.myArrayslist[0][index].path}`
              );
              if (index === arrays.length - 1) {
                if (myArrays != null) {
                  new Promise((f) => setTimeout(f, 2000));
                  res.send({
                    code: 201,
                    message: 'file uploaded',
                    imagedatalength: req.files?.length,
                    data: myArrays,
                    recivied: true,
                  });
                }
              }
            });
            // res.send({
            //   code: 201,
            //   message: 'file uploaded',
            //   imagedatalength: req.files?.length,
            //   data: JSobj.myArrayslist[0],
            //   recivied: true,
            // });
          } else {
            res.send({
              message: 'not uploaded',
              data: null,
              code: 303,
            });
          }
        });
      } else {
        const upload = multer({
          storage: new FTPStorage({
            basepath: '/remote',
            ftp: {
              host: process.env.DRFTPHost,
              user: process.env.DRFTPUser,
              password: process.env.DRFTPPwd,
              secure: false,
            },
            destination: function (
              req: Request,
              file: any,
              options: any,
              callback: any
            ) {
              if (filetype == 'postaudio') {
                //  const path = '/picfinal/test/' + Date.now() + file.originalname;
                const path = '/PostAudio/' + Date.now() + file.originalname;
                callback(null, path);
              } else if (filetype == 'profilepic') {
                const path = '/ProfilePics/' + Date.now() + file.originalname;
                callback(null, path);
              } else if (filetype == 'postbgimage') {
                const path =
                  '/Postbackgroundimage/' + Date.now() + file.originalname;
                callback(null, path);
              }
              //  const path = '/Fullscreenvideo/' + Date.now() + file.originalname;
            },
          }),
        }).single('image');

        upload(req, res, (err) => {
          if (err) {
            res.send({
              message: 'not uploaded',
              data: null,
              code: 302,
            });
          }
          res.send({
            message: 'uploaded',
            data: `https://dragonfistztamilan.in/bindazboyapp${req.file?.path}`,
            code: 201,
          });
        });
      }
    } catch (err) {
      console.log(err);
      if (err) {
        res.send({
          message: 'not uploaded',
          data: null,
          code: 402,
        });
      }
    }
  }

  //! update blogs in database
  async updateBlogs(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;
    let { blogupdate_id } = req.params;
    let {
      blog_title,
      blog_description,
      blog_image,
      blog_category,
      blog_audio,
      blog_images,
      blog_date,
    } = req.body;

    if (admin_token === admin_secrect) {
      await this.createQueryBuilder()
        .update(BlogEntity)
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
        .then((data: any) => {
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
  }

  //! update blogs in database
  async updateimageBlog(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;
    let { blogupdate_id } = req.params;
    let { blog_image } = req.body;
    if (admin_token === admin_secrect) {
      await this.createQueryBuilder()
        .update(BlogEntity)
        .set({
          blog_image,
        })
        .where('blog_id = :blogupdate_id', { blogupdate_id })
        .execute()
        .then((data: any) => {
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
  }

  //! update blog audio in database
  async updateaudioBlog(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;
    let { blogupdate_id } = req.params;
    let { blog_audio } = req.body;
    if (admin_token === admin_secrect) {
      await this.createQueryBuilder()
        .update(BlogEntity)
        .set({
          blog_audio,
        })
        .where('blog_id = :blogupdate_id', { blogupdate_id })
        .execute()
        .then((data: any) => {
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
  }
  //! update post views
  async addviewpost(req: Request, res: Response) {
    let { blog_id } = req.params;
    let { blog_view } = req.body;

    await this.createQueryBuilder()
      .update(BlogEntity)
      .set({
        blog_view,
      })
      .where('blogs.blog_id = :blog_id', { blog_id })
      .execute()
      .then((data: any) => {
        var isAffected = data.affected;
        if (isAffected > 0) {
          return res.send({
            code: 201,
            message: 'updated Sucessfully',
            submitted: true,
          });
        } else {
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
  }

  //! update blog images in database
  async updateimagesBlog(req: Request, res: Response) {
    let admin_token = req.headers.authorization as string;
    let admin_secrect = process.env.ADMIN_SECRECT as string;
    let { blogupdate_id } = req.params;
    let { blog_images } = req.body;
    if (admin_token === admin_secrect) {
      await this.createQueryBuilder()
        .update(BlogEntity)
        .set({
          blog_images,
        })
        .where('blog_id = :blogupdate_id', { blogupdate_id })
        .execute()
        .then((data: any) => {
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
  }

  //! fetch All blogs in database
  async fetchBlogs(req: Request, res: Response) {
    let blogs = await this.createQueryBuilder('blogs')
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
      } else {
        return res.send({
          received: true,
          message: 'no blogs add please',
          code: 402,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);

        return res.send({
          received: false,
          message: null,
          code: 403,
        });
      }
    }
  }

  //! fetch All blogs with limit pagination in database
  async fetchBlogswithlimit(req: Request, res: Response) {
    let peritem = 9;
    let { pageno } = req.params;
    let blogs = await this.createQueryBuilder('blogs')
      .select()
      .orderBy('blogs.blog_id', 'DESC')
      .offset((parseInt(pageno) - 1) * peritem)
      .limit(peritem)
      .getMany();

    let blogscount = await this.createQueryBuilder('blogs')
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
      } else {
        return res.send({
          received: true,
          message: 'no blogs add please',
          totalcount: 0,
          code: 402,
        });
      }
    } catch (error) {
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
  }

  //! fetch Category blogs in database
  async categoryBlogs(req: Request, res: Response) {
    let { category } = req.params;

    try {
      let blogcategory = await this.createQueryBuilder('blogs')
        .select()
        .where('blogs.blog_category = :category', { category })
        .getMany();

      if (blogcategory !== undefined) {
        return res.send({
          received: true,
          data: blogcategory,
          code: 200,
        });
      } else {
        return res.send({
          received: true,
          data: null,
          code: 200,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          received: false,
          data: null,
          code: 403,
        });
      }
    }
  }

  async fetchCategoryblogswithlimit(req: Request, res: Response) {
    let peritem = 9;
    let { catergory_title, pageno } = req.params;

    try {
      let blogcategory = await this.createQueryBuilder('blogs')
        .leftJoinAndSelect('blogs.catergorys', 'catergory')
        .where('blogs.blog_category = :catergory_title', { catergory_title })
        .offset((parseInt(pageno) - 1) * peritem)
        .limit(peritem)
        .getMany();

      let blogcategorycount = await this.createQueryBuilder('blogs')
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
    } catch (error) {
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
  }

  //! fetch blogs Details in database
  async loadingBlogsDetail(req: Request, res: Response) {
    let { detailid } = req.params;

    try {
      let blogDetails = await this.createQueryBuilder('blogs')
        .select()
        .where('blogs.blog_id = :detailid', { detailid })
        .getOne();

      if (blogDetails !== undefined) {
        return res.send({
          data: blogDetails,
          received: true,
          code: 200,
        });
      } else {
        return res.send({
          data: 'No details Available',
          received: true,
          code: 402,
        });
      }
    } catch (error) {
      if (error) {
        console.log(error);
        return res.send({
          data: 'Something went wrong ,try agian',
          received: false,
          code: 403,
        });
      }
    }
  }

  //! delete blog in database
  async deleteBlog(req: Request, res: Response) {
    let { deleteid } = req.params;

    let admin_secrect = process.env.ADMIN_SECRECT as string;
    let admin_token = req.headers.authorization as string;

    try {
      if (admin_secrect === admin_token) {
        await this.createQueryBuilder('blogs')
          .delete()
          .where('blogs.blog_id = :deleteid', { deleteid })
          .execute()
          .then((data: any) => {
            return res.send({
              deleted: true,
              data: data,
              message: 'Deleted Sucessfully',
              code: 201,
            });
          });
      } else {
        return res.send({
          deleted: false,
          message: 'Failed ,your not Admin',
          code: 302,
        });
      }
    } catch (error) {
      if (error) {
        return res.send({
          deleted: false,
          message: 'something went wrong',
          code: 402,
        });
      }
    }
  }
  //! search blog in database
  async searchBlogs(req: Request, res: Response) {
    let { query } = req.params;

    try {
      var result = await this.createQueryBuilder('blogs')
        .select()
        .where('blogs.blog_title ILIKE :query', { query: `%${query}%` })
        .getMany();

      if (result !== undefined) {
        return res.send({
          code: 200,
          data: result,
        });
      }
    } catch (error) {
      if (error) {
        return res.send({
          code: 402,
          data: error,
        });
      }
    }
  }

  async deleteimageBlog(req: Request, res: Response) {
    let { deleteid } = req.params;
    let admin_secrect = process.env.ADMIN_SECRECT as string;
    let admin_token = req.headers.authorization as string;
    try {
      if (admin_secrect === admin_token) {
        await this.createQueryBuilder('blogs')
          .delete()
          .where('blogs.blog_image = :deleteid', { deleteid })
          .execute()
          .then((data: any) => {
            return res.send({
              deleted: true,
              data: data,
              message: 'Deleted Sucessfully',
              code: 201,
            });
          });
      } else {
        return res.send({
          deleted: false,
          message: 'Failed ,your not Admin',
          code: 302,
        });
      }
    } catch (error) {
      if (error) {
        return res.send({
          deleted: false,
          message: 'something went wrong',
          code: 402,
        });
      }
    }
  }
}
