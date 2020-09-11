const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: { type: String, required: true },
  username: { type: String, required: true },
  email:{type: String, required:true, unique: true, 
    match: /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/
   }, //unique doesn't add validation that's why we had to do it in users.js but instead optimises the field for 
  //searching and indexing
  password: {type: String, required:true},
  userImage: { type: String, required: true },
  liked:[{type: mongoose.Schema.Types.ObjectId, ref: "Beach" , required: true}]
 });
module.exports = mongoose.model("User", userSchema);
