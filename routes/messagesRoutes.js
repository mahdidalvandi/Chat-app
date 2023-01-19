const express = require("express");
const {
  addMessage,
  getAllMessage,
} = require("../controllers/messagesController");
const messageRoutes = express.Router();
messageRoutes.post("/addmsg/", addMessage);
messageRoutes.post("/getmsg/", getAllMessage);

module.exports = messageRoutes;
