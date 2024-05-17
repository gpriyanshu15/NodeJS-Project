const express = require("express");

const { connectMongoDB } = require("./connection");
const userRouter = require("./routes/user");
const { logReqRes } = require("./middlewares");

const app = express();
const PORT = 8000;

// Connection
connectMongoDB("mongodb://127.0.0.1:27017/new").then(() =>
  console.log("MongoDB Connected!")
);

// Middleware - Plugin
app.use(express.urlencoded({ extended: false }));
app.use(logReqRes("log.txt"));

// Routes
app.use("/api/users", userRouter);

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
