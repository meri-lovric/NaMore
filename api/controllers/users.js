const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Beach = require("../models/beach");

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("name username userImage email _id liked")
    .populate("liked", "name beachImage _id likes")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        users: docs.map((doc) => {
          return {
            name: doc.name,
            username: doc.username,
            email: doc.email,
            _id: doc._id,
            userImage: doc.userImage,
            liked: doc.liked,
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
};

exports.users_signup = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length >= 1) {
        return res.status(409).json({
          message: "Conflicting data - a user with this email already exists",
        });
      } else {
        bcrypt.hash(req.body.password, 10, (err, hash) => {
          if (err) {
            return res.status(500).json({
              error: err,
            });
          } else {
            const user = new User({
              _id: new mongoose.Types.ObjectId(),
              name: req.body.name,
              username: req.body.username,
              email: req.body.email,
              password: hash,
              userImage: req.file.path,
              liked: [],
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
                    request: {
                      type: "GET",
                      url: "http://localhost:3000/users/" + result._id,
                    },
                  },
                });
              })
              .catch((err) => {
                console.log(err.message);
                res.status(500).json({
                  error: err,
                });
              });
          }
        });
      }
    });
};

exports.users_get_one = (req, res, next) => {
  const id = req.params.userId;
  User.findById(id)
    .select("name username userImage _id liked")
    .populate("liked", "name beachImage _id likes")
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
};

exports.users_login = (req, res, next) => {
  User.find({ email: req.body.email })
    .exec()
    .then((user) => {
      if (user.length < 1) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      bcrypt.compare(req.body.password, user[0].password, (err, result) => {
        if (err) {
          return res.status(401).json({
            message: "Auth failed",
          });
        }
        if (result) {
          const token = jwt.sign(
            {
              email: user[0].email,
              userId: user[0]._id,
            },
            process.env.JWT_KEY,
            {
              expiresIn: "1h",
            }
          );
          return res.status(200).json({
            message: "Auth succesful",
            token: token,
            email: user[0].email,
          });
        }
        res.status(401).json({
          message: "Auth failed",
        });
      });
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.users_delete_user = (req, res, next) => {
  User.deleteOne({ _id: req.params.userId })
    .exec()
    .then(
      res.status(200).json({
        message: "User deleted",
        userId: req.params.userId,
      })
    )
    .catch((err) => {
      console.log(err);
      res.status(500).json({ error: err });
    });
};
exports.users_edit_image = (req, res, next) => {
  const id = req.params.userId;
  console.log("Id: " + id);
  console.log("In request " + req.file.path);
  User.findOneAndUpdate(
    { _id: id },
    { $set: { userImage: req.file.path } },
    { new: true }
  )
    .exec()
    .then((result) => {
      console.log(result);
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({
        error: err,
      });
    });
};
exports.users_edit_user = (req, res, next) => {
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
};
exports.users_addliked = (req, res, next) => {
  console.log(req.body.user.liked);
  if (req.body.user.liked.filter((beach) => beach == req.body.beachId).length == 0) {
    User.findOneAndUpdate(
      { _id: req.body.user._id },
      { $push: { liked: req.body.beachId } }
    )
      .exec()
      .then(() => {
        console.log("Updated");
      })
      .catch((error) => console.log(error));
  } else {
    console.log("Beach already liked.");
  }
};
exports.users_removeliked = (req, res, next) => {
  User.findOne({ _id: req.body.user._id }, function(err, user) {
    console.log("User to remove liked: " + user.name);
    const index = user.liked.indexOf(req.body.beachId);
    if (index > -1) {
      user.liked.splice(index, 1);
    }
    console.log(user.liked);
    user.save(function(err) {
      console.log("Removed beach");
      console.log(user.liked.length);
      if (err) {
        console.log(err);
      }
    });
  });
};
