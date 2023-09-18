const express = require("express");
const nodemailer = require("nodemailer");
const { getMaxListeners } = require("../models/student.schema");

const transport = nodemailer.createTransport({
    service:"gmail",
    auth:{
           user:"harshdesai254@gmail.com",
           password:"galvlvxdkbbdlefs"
         }  
});



module.exports =transport;