const express = require("express");
const users = require("./MOCK_DATA.json");
const fs = require("fs");

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
app.get("/users", (req, res) => {
  const html = `
    <ul>
    ${users.map((user) => `<li>${user.first_name}</li>`).join("")}
    </ul>
    `;
  res.send(html);
});

// REST API's
app.get("/api/users", (req, res) => {
  return res.json(users);
});

app
  .route("/api/users/:id")
  .get((req, res) => {
    const id = Number(req.params.id);
    const user = users.find((user) => user.id === id);
    return res.json(user);
  })
  .patch((req, res) => {
    const id = Number(req.params.id);
    const body = req.body;
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users[index] = { ...users[index], ...body };
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({ status: "SUCCESS", updatedUser: users[index] });
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  })
  .delete((req, res) => {
    const id = Number(req.params.id);
    const index = users.findIndex((user) => user.id === id);
    if (index !== -1) {
      users.splice(index, 1);
      fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
        return res.json({
          status: "SUCCESS",
          message: "User deleted successfully",
        });
      });
    } else {
      return res.status(404).json({ error: "User not found" });
    }
  });

app.post("/api/users", (req, res) => {
  const body = req.body;
  users.push({ ...body, id: users.length + 1 });
  fs.writeFile("./MOCK_DATA.json", JSON.stringify(users), (err, data) => {
    return res.status(201).json({ status: "SUCCESS", id: users.length });
  });
});

app.listen(PORT, () => console.log(`server started at PORT:${PORT}`));
