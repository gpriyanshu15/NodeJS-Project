const User = require("../models/user");

async function handleGetAllUsers(req, res) {
  const alldbusers = await User.find({});
  return res.json(alldbusers);
}

async function handleGetUserById(req, res) {
  const user = await User.findById(req.params.id);
  if (!user) return res.status(404).json({ error: "user not found" });
  return res.json(user);
}

async function handleUpdateUserById(req, res) {
  const user = await User.findByIdAndUpdate(req.params.id, {
    last_name: "changed",
  });
  if (user == -1) return res.status(404).json({ error: "User not found" });
  return res.json({ Status: "Success" });
}

async function handleDeleteUserById(req, res) {
  const user = await User.findByIdAndDelete(req.params.id);
  if (user == -1) return res.status(404).json({ error: "User not found" });
  return res.json({ Status: "Success" });
}

async function handleCreateNewUser(req, res) {
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
  return res.status(201).json({ msg: "Success" , id: result._id});
}

module.exports = {
  handleGetAllUsers,
  handleGetUserById,
  handleUpdateUserById,
  handleDeleteUserById,
  handleCreateNewUser,
};
