const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Post = require("../models/post");
const User = require("../models/user");

router.get("/", (req, res, next) => {
  Post.find()
    .select("user _id text time")
    .populate('user', 'name username photoUrl')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        posts: docs.map((doc) => {
          return {
            user: doc.user,
            _id: doc._id,
            text: doc.text,
            time: doc.time,
            request: {
              type: "GET",
              url: "http://localhost:3000/posts/" + doc._id,
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
  User.findById(req.body.userId) //check if user exists before adding post to db
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const post = new Post({
        _id: new mongoose.Types.ObjectId(),
        text: req.body.text,
        user: req.body.userId,
      });
      return post.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
});

router.get("/:postId", (req, res, next) => {
  Post.findById(req.params.postId)
    .select("user text _id")
    .populate('user')
    .exec()
    .then((post) => {
      if (post) {
        res.status(200).json({
          post: post,
          request: {
            type: "GET",
            url: "http://localhost:3000/posts",
          },
        });
      } else {
        res.status(404).json({ message: "No valid ID found" });
      }
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
});

router.delete("/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Post deleted",
        request: {
          type: "POST",
          url: "http://localhost:3000/posts",
          body: { userId: "ID", text: "String" },
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

router.patch("/:postId", (req, res, next) => {
  const id = req.params.postId;
  Post.update({ _id: id }, { text: req.body.text })
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
