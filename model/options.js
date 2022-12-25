const mongoose = require("mongoose");

const coursesquerySchema = new mongoose.Schema({
  courseName: {
    type: String,
  },
  courseYear: {
    type: String,
  },
  subjectFirstYear: {
    type: String,
  },
  subjectSecondYear: {
    type: String,
  },
  subjectThirdYear: {
    type: String,
  },
  subjectFourthYear: {
    type: String,
  },
  paperYear: {
    type: String,
  },
  paper: {
    type: String,
  },
});

module.exports = mongoose.model("coursesquery", coursesquerySchema);
