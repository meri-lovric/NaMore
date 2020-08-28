const mongoose = require("mongoose");

const postSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User" , required: true},
  text: { type: String, required: true },
  time: { type: Date, default: Date.now },
});
module.exports = mongoose.model("Post", postSchema);
