const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Beach = require("../models/beach");
const { update } = require("../models/beach");

router.get("/", (req, res, next) => {
  Beach.find()
    .select('name description author photoUrl _id')
    .exec()
    .then((docs) => {
      const response = {
        count: docs.length,
        beaches: docs.map(doc => {
          return{
            name: doc.name,
            description: doc.description,
            author: doc.author,
            photo: doc.photoUrl,
            _id: doc._id,
            request:{
              type: 'GET',
              url: 'http://localhost:3000/beaches/' + doc._id //later hardcode domain
            }
          }
        })
      }
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
}); //get method handles incoming get req

router.post("/", (req, res, next) => {
  const beach = new Beach({
    _id: new mongoose.Types.ObjectId(), // creates unique id
    name: req.body.name,
    description: req.body.description,
    author: req.body.author,
    photoUrl: req.body.photo,
  });
  beach
    .save()
    .then((result) => {
      console.log(result);
      res.status(201).json({
        message: "Successfully created new beach",
        createdBeach: 
        {
          name: result.name,
          description: result.description,
          author: result.author,
          photo: result.photoUrl,
          request:{
              type: 'GET',
              url: "http://localhost:3000/beaches/" + result._id
          }
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
}); //post method handles incoming get req

router.get("/:beachId", (req, res, next) => {
  const id = req.params.beachId;
  Beach.findById(id)
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
}); //express syntax for variables :variable

router.patch("/:beachId", (req, res, next) => {
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
});

router.delete("/:beachId", (req, res, next) => {
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
});
module.exports = router;
