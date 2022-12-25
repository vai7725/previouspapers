const mongoose = require("mongoose");

const paperSchema = new mongoose.Schema(
  {
    paperName: {
      type: String,
    },
    paperLink: {
      type: String,
    },
  },
  { typeKey: "$type" }
);

module.exports = mongoose.model("paper", paperSchema);
