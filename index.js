require("dotenv").config();
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const User = require("./models");

// app.use("/users", async (req, res, next) => {});

app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get("/getUsers", async (req, res, next) => {
  try {
    const itemsPerPage = req.body.itemsPerPage;
    const page = req.body.page;

    const totalUsers = await User.find();

    const users = await User.find()
      .limit(itemsPerPage)
      .skip(page * itemsPerPage);

    return res.status(200).json({ count: totalUsers.length, users: users });
  } catch (err) {
    console.log(err);
  }
});

app.get("/userOffset", async (req, res, next) => {
  const offset = req.query.offset;
  const limit = req.query.limit;

  try {
    const totalUsers = await User.find();
    const users = await User.find().limit(limit).skip(offset);
    return res.status(200).json({ count: totalUsers.length, users: users });
  } catch (err) {
    console.log(err);
  }
});

app.get("/get", async (req, res, next) => {
  try {
    const users = await User.find();
    return res.json({ count: users.length, Users: users });
  } catch (e) {
    console.log("Err: ", e);
  }
});

app.post("/create", async (req, res, next) => {
  console.log("RES: ", req);

  try {
    const newUser = await User.create(req.body);
    return res.json(newUser);
  } catch (err) {
    console.log(err);
  }
});

mongoose
  .connect("mongodb://localhost:27017/pagination")
  .then((res) => {
    console.log("Database connected successfully");
  })
  .catch((err) => {
    throw new Error("Error connecting");
  });

app.listen(8000, (req, res) => {
  console.log("Server running on port 8000");
});
