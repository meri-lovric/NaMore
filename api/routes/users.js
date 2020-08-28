const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const User = require("../models/user");

router.get("/", (req, res, next) => {
  User.find()
    .select("name username _id")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => {
          return {
            name: doc.name,
            usernmae: doc.username,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/users/" + doc._id,
            },
          };
        }),
      };
      if (docs.length >= 0) {
        res.status(200).json(response);
      } else {
        res.status(404).json({
          message: "No entries found",
        });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.post("/", (req, res, next) => {
  const user = new User({
    _id: new mongoose.Types.ObjectId(),
    name: req.body.name,
    username: req.body.username,
    photoUrl: req.body.photo,
   });
  user
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Successfully created new user",
        createdUser: {
          name: result.name,
          username: result.username,
          photoUrl: result.photo,
          statusNum: "0",
          friendsNum: "0",
          beachesNum: "0",
          likedNum: "0",
          request: {
            type: "GET",
            url: "http://localhost:3000/users/" + result._id,
          },
        },
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:userId", (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("name username _id")
    .exec()
    .then((doc) => {
      console.log("From database " + doc);
      if (doc) {
        res.status(200).json(doc);
      } else {
        res.status(404).json({ message: "No valid ID found" });
      }
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
});
/*
router.delete("/:userId", (req, res, next) => {
  res.status(200).json({
    message: "User deleted",
    userId: req.params.userId,
  });
}); // odluci naknadno ima li smisla ovime se bavit jer triba onda i njegove plaze brisat
*/
router.patch("/:userId", (req, res, next) => {
  const id = req.params.userId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  User.update({ _id: id }, { $set: updateOps })
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});
module.exports = router;
