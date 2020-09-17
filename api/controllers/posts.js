const checkAuth = require("../middleware/check-auth");

const Post = require("../models/post");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.posts_get_all = (req, res, next) => {
  Post.find()
    .select("user _id text time")
    .populate("user", "name username userImage")
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
              url: "https://na-more.netlify.app/posts/" + doc._id,
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
};
exports.posts_create_post = (req, res, next) => {
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
};

exports.posts_get_one = (req, res, next) => {
  Post.findById(req.params.postId)
    .select("user text _id")
    .populate("user")
    .exec()
    .then((post) => {
      if (post) {
        res.status(200).json({
          post: post,
          request: {
            type: "GET",
            url: "https://na-more.netlify.app/posts",
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
};
exports.posts_delete_post = (req, res, next) => {
  const id = req.params.postId;
  Post.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json({
        message: "Post deleted",
        request: {
          type: "POST",
          url: "https://na-more.netlify.app/posts",
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
};
exports.posts_edit_post = (req, res, next) => {
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
};
