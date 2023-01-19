const express = require("express");
const cores = require("cors");
const mongoose = require("mongoose");
const userRouter = require("./routes/userRoutes");
const messageRouter = require("./routes/messagesRoutes");
const dotenv = require("dotenv");
const socket = require("socket.io");
const app = express();
const path = require("path");
require("dotenv").config();
app.use(cores());
app.use(express.json());

app.use("/api/auth", userRouter);
app.use("/api/messages", messageRouter);

dotenv.config();
mongoose
  .connect(`${process.env.DATABASE_URL}`, { useNewUrlParser: true })
  .then(() => console.log("Connected to DB"))
  .catch((error) => console.log(error));

const dirname = path.resolve();
app.use(express.static(path.join(dirname, "./public/build")));
app.get("*", (req, res) =>
  res.sendFile(path.join(dirname, "./public/build/index.html"))
);

const server = app.listen(process.env.PORT, () => {
  console.log(`Conntected to port ${process.env.PORT}`);
});
const io = socket(server, {
  cores: {
    origin: "http://localhost:3000",
    Credential: true,
  },
});
global.onlineUsers = new Map();
io.on("connection", (socket) => {
  global.chatSocket = socket;
  socket.on("add-user", (userId) => {
    onlineUsers.set(userId, socket.id);
  });
  socket.on("send-msg", (data) => {
    const sendUserSocket = onlineUsers.get(data.to);
    if (sendUserSocket) {
      socket.to(sendUserSocket).emit("msg-recevie", data.msg);
    }
  });
});
