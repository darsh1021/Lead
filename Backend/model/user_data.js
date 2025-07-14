const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  points: { type: Number, default: 0 }
});


module.exports = mongoose.model('UserData', userSchema);
