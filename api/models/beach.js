const mongoose = require('mongoose');

const beachSchema = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId, //not a constructor like in beaches.js but just tells the expected type
    name: { type:String, required: true},
    description: { type:String, required: true},
    author: { type:String, required: true},
    beachImage: {type:String, required: true}
});

module.exports = mongoose.model('Beach', beachSchema);