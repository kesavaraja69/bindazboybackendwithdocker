"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.contactusRouter = void 0;
const express_1 = require("express");
const contactus_controller_1 = require("../controllers/contactus.controller");
const contactusRouter = (0, express_1.Router)();
exports.contactusRouter = contactusRouter;
//! post 
contactusRouter.post("/addcontactusandreport", contactus_controller_1.ContactusContoller.adduserreportandcontactus);
//! get
contactusRouter.get("/fetchcontactusandreport", contactus_controller_1.ContactusContoller.fetchuserreportandcontactus);
contactusRouter.get("/fetchcontactusorreport", contactus_controller_1.ContactusContoller.fetchuserreportorcontactus);
