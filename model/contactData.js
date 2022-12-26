const mongoose = require("mongoose");

const contactDataSchema = new mongoose.Schema({
  userName: {
    type: String,
    required: [true, "Name is required."],
  },
  userEmail: {
    type: String,
    required: [true, "Email is required."],
  },
  userUniversity: {
    type: String,
    required: [true, "University name is required."],
  },
  userMsg: {
    type: String,
    required: [true, "Write a msg you want to give."],
  },
  time: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("contactform", contactDataSchema);
