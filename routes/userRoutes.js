const express = require("express");
const {
  register,
  login,
  setAvatar,
  getAllUsers,
} = require("../controllers/usersController");
const userRoutes = express.Router();
userRoutes.post("/register", register);
userRoutes.post("/login", login);
userRoutes.post("/setAvatar/:id", setAvatar);
userRoutes.get("/allusers/:id", getAllUsers);
module.exports = userRoutes;
