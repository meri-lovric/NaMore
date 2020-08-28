const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  username: { type: String, required: true },
  photoUrl: { type: String, required: true },
  statusNum: { type: Number, default: 0 },
  friendsNum: { type: Number, default: 0 },
  beachesNum: { type: Number, default: 0 },
  likedNum: { type: Number, default: 0 },
});
module.exports = mongoose.model("User", userSchema);
