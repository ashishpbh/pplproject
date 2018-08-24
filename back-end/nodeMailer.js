//use 'strict';
var nodemailer = require("nodemailer");
var express = require("express");
var router = express.Router();

//var nodemailer = require("nodema;

var transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "pandeyashish1995pbh@gmail.com",
    pass: "pandey@2895"
  }
});

module.exports = transporter;
