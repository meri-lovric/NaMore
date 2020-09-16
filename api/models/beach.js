const mongoose = require("mongoose");

const beachSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId, //not a constructor like in beaches.js but just tells the expected type
  name: { type: String, required: true },
  description: { type: String, required: true },
  author: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  beachImage: { type: String, required: true },
  isClicked: { type: Boolean, required: true, default: false },
  isHidden: { type: Boolean, required: true, default: false },
  likes: { type: Number, required: true, default: 0 },
  time: { type: Date, default: Date.now },
  options: {
    bar: { type: Boolean, required: true, default: false },
    shade: { type: Boolean, required: true, default: false },
    kids: { type: Boolean, required: true, default: false },
    pets: { type: Boolean, required: true, default: false },
    parking: { type: Boolean, required: true, default: false },
    food: { type: Boolean, required: true, default: false },
  },
  comments: [
    {
      name: {
        type: String,
        required: true,
      },
      username: {
        type: String,
        required: true,
      },
      userImage: {
        type: String,
        required: true,
      },
      text: {
        type: String,
        required: true,
      },
      time: {
        type: Date,
        default: Date.now,
      },
    },
  ],
});

module.exports = mongoose.model("Beach", beachSchema);
