const mongoose = require("mongoose");

const universityCard = new mongoose.Schema({
  universityName: {
    type: String,
    // required: true,
  },
  unImgLink: {
    type: String,
    // required: true,
  },
  universityDesc: {
    type: String,
    // required: true,
  },
});

module.exports = mongoose.model("Universitycard", universityCard);
