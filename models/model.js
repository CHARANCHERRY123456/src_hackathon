// models/User.js
const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  phno: { type: String, required: true }
});

module.exports = mongoose.model('User', userSchema);



// models/Venue.js
const mongoose = require('mongoose');

const venueSchema = new mongoose.Schema({
  name: String,
  availability: String,
  startTime: String,
  endTime: String,
  bookedBy: String,
  bookedById: String,
  contactNo: String
});

module.exports = mongoose.model('Venue', venueSchema);
