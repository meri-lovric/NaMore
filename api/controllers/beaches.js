const Beach = require("../models/beach");
const User = require("../models/user");
const mongoose = require("mongoose");

exports.beaches_get_all = (req, res, next) => {
  Beach.find()
    .populate("author", "name username")
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        beaches: docs.map((doc) => {
          return {
            name: doc.name,
            description: doc.description,
            author: doc.author,
            beachImage: doc.beachImage,
            isClicked: doc.isClicked,
            likes: doc.likes,
            options:doc.options,
            _id: doc._id,
            request: {
              type: "GET",
              url: "http://localhost:3000/beaches/" + doc._id, //later hardcode domain
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

exports.beaches_create_beach = (req, res, next) => {
  console.log(req.file);
  User.findById(req.body.author)
    .then((user) => {
      if (!user) {
        return res.status(404).json({
          message: "User not found",
        });
      }
      const beach = new Beach({
        _id: new mongoose.Types.ObjectId(), // creates unique id
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        beachImage: req.file.path,
      });
      return beach.save();
    })
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Successfully created new beach",
        createdBeach: {
          name: result.name,
          description: result.description,
          author: result.author,
          request: {
            type: "GET",
            url: "http://localhost:3000/beaches/" + result._id,
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
  // save() stores in database, then() makes it into a promise
};

exports.beaches_get_one = (req, res, next) => {
  const id = req.params.beachId;
  Beach.findById(id)
    .populate("author", "name username")
    .exec()
    .then((doc) => {
      console.log("From database: " + doc);
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
  // all code from this point doesn't wait for the previous code to finish
  // hence a promise is asyncronous
  // therefore a response is sent from .then() and .catch() blocks
};
exports.beaches_edit_beach = (req, res, next) => {
  const id = req.params.beachId;
  const updateOps = {};
  for (const ops of req.body) {
    updateOps[ops.propName] = ops.value;
  }
  Beach.update({ _id: id }, { $set: updateOps })
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

exports.beaches_delete_beach = (req, res, next) => {
  const id = req.params.beachId;
  Beach.remove({ _id: id })
    .exec()
    .then((result) => {
      res.status(200).json(result);
    })
    .catch((err) => {
      console.log(err);
      res.status(500).json({
        error: err,
      });
    });
};
