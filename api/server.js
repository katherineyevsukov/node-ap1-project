// BUILD YOUR SERVER HERE
const express = require("express");
const Users = require("./users/model");

const server = express();

server.use(express.json());

server.get("/", (req, res) => {
  res.json({ message: "api is running" });
});

server.get("/api/users", async (req, res) => {
  try {
    const users = await Users.find();
    res.status(200).json(users);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The users information could not be retrieved" });
  }
});

server.get("/api/users/:id", async (req, res) => {
  try {
    const user = await Users.findById(req.params.id);
    !user
      ? res
          .status(404)
          .json({ message: "The user with the specified ID does not exist" })
      : res.status(200).json(user);
  } catch (err) {
    res
      .status(500)
      .json({ message: "The user information could not be retrieved" });
  }
});

server.post("/api/users", (req, res) => {
  const { name, bio } = req.body;
  if (!name || !bio) {
    res
      .status(400)
      .json({ message: "Please provide name and bio for the user" });
  } else {
    Users.insert({ name, bio })
      .then((user) => {
        res.status(201).json(user);
      })
      .catch((err) => {
        res
          .status(500)
          .message({
            message: "There was an error while saving the user to the database",
          });
      });
  }
});

server.delete("/api/users/:id", (req, res) => {
  Users.remove(req.params.id)
    .then((deleted) => {
      !deleted
        ? res
            .status(404)
            .json({ message: "The user with the specified ID does not exist" })
        : res.status(200).json(deleted);
    })
    .catch((err) => {
      res.status(500).json({ message: "The user could not be removed" });
    });
});

module.exports = server; // EXPORT YOUR SERVER instead of {}
