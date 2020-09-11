const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Beach = require("../models/beach");

exports.users_get_all = (req, res, next) => {
  User.find()
    .select("name username userImage email _id liked")
    .populate("liked", "name beachImage _id")
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
    .populate("liked", "name beachImage _id")
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
  User.findOne({ _id: req.body.userId }, function(err, user) {
    user.liked.unshift(req.body.beachId);
    user.save(function(err) {
      console.log("Added beach");
      console.log(user.liked.length);
      if (err) {
        console.log(err);
      }
    });
  });
  //const currentUser = User.findById(req.body.userId);
  /* User.findOneAndUpdate(
    { _id: req.body.userId },
    { $push: { liked: req.body.beachObject } }
  )
    .exec()
    .then(console.log('Updated'))
    .catch((error) => console.log(error));
*/
  /*Promise.all([currentUser, currentBeach])
    .then((result) => {
      console.log(result[0].data, result[1].data);
    })
    .catch((error) => {
      console.log(error);
    });
    */
  /*
  
  Promise.all([currentUser, currentBeach]).then((result) => {
    console.log("Result: " +result);
   // result[0].liked.unshift(result[1]);
    console.log("Liked: "+ result[0].liked)
    console.log("Length: " + result[0].liked.length)
    User.updateOne({ _id: req.body.userId }, { $unshift: { liked: result[1] } }, function(
      err,
      result
    ) {
      if (err) {
        res.send(err);
      } else {
        res.send(result);
      }
    });
    */
  // console.log("Length: " + currentUser.liked.length);
};
/*User.findById(req.body.userId)
    .exec()
    .then((user) => {
      currentUser = user.user.data;
      console.log(currentUser)
    })
    .catch((error) => {
      console.log(error);
    });
  
  Beach.findById(req.body.beachId)
    .exec()
    .then((beach) => {
      console.log(currentUser, beach);
      currentBeach = beach.data;
    })
    .catch((error) => {
      console.log(error);
    });
    if(currentUser && currentBeach){
      console.log("User:" + currentUser + "\n Beach: " +currentBeach)
      //currentUser.likes.unshift(currentBeach);
    } 
    */
exports.users_removeliked = (req, res, next) => {
  User.findOne({ _id: req.body.userId }, function(err, user) {
    console.log(user)
    const index = user.liked.indexOf(req.body.beachId);
    if(index > -1){
      user.liked.splice(index,1);
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
