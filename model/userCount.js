const mongoose = require("mongoose");

const userCountSchema = new mongoose.Schema({
  userVisiting: Boolean,
  userCount: Number,
});

module.exports = mongoose.model("traffic", userCountSchema);
