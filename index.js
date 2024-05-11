const express = require("express");
// const users = require("./MOCK_DATA.json");
const fs = require("fs");
const { type } = require("os");

const mongoose = require("mongoose");
const { timeStamp } = require("console");

mongoose
  .connect("mongodb://127.0.0.1:27017/new")
  .then(() => console.log("MongoDB Connected !"))
  .catch((err) => {
    console.log("MONGO Err", err);
  });

const userSchema = mongoose.Schema(
  {
    first_name: {
      type: String,
      required: true,
    },
    last_name: {
      type: String,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    gender: {
      type: String,
    },
    job_title: {
      type: String,
    },
  },
  { timestamps: true }
);

const User = mongoose.model("user", userSchema);

const app = express();
const PORT = 8000;

app.use(express.urlencoded({ extended: false }));

// Middleware
app.use((req, res, next) => {
  fs.appendFile(
    "log.txt",
    `\n ${Date.now()} : ${req.ip} , ${req.method} , ${req.path}`,
    (err, data) => {
      next();
    }
  );
});

// ROUTES
app.get("/users", async (req, res) => {
  const alldbusers = await User.find({});
  const html = `
    <ul>
    ${alldbusers
      .map((user) => `<li>${user.first_name} - ${user.email}</li>`)
      .join("")}
    </ul>
    `;
  res.send(html);
});

// REST API's
app.get("/api/users", async (req, res) => {
  const alldbusers = await User.find({});
  return res.json(alldbusers);
});

app
  .route("/api/users/:id")
  .get(async (req, res) => {
    const user = await User.findById(req.params.id);
    if (!user) return res.status(404).json({ error: "user not found" });
    return res.json(user);
  })
  .patch(async (req, res) => {
    const user = await User.findByIdAndUpdate(req.params.id, {
      last_name: "changed",
    });
    if (user == -1) return res.status(404).json({ error: "User not found" });
    return res.json({ Status: "Success" });
  })
  .delete(async (req, res) => {
    const user = await User.findByIdAndDelete(req.params.id);
    if (user == -1) return res.status(404).json({ error: "User not found" });
    return res.json({ Status: "Success" });
  });

app.post("/api/users", async (req, res) => {
  const body = req.body;
  if (
    !body ||
    !body.first_name ||
    !body.last_name ||
    !body.email ||
    !body.gender ||
    !body.job_title
  )
    return res.status(400).json({ msg: "All fields are required" });

  const result = await User.create({
    first_name: body.first_name,
    last_name: body.last_name,
    email: body.email,
    gender: body.gender,
    job_title: body.job_title,
  });
  return res.status(201).json({ msg: "Success" });
});

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
