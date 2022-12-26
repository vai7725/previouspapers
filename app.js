// ==========================
// setting up environment variables
require("dotenv").config();

// ==========================
// importing npm modules
const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");

// ==========================
// importing local modules
const connectDB = require("./db/connect");
const options = require("./model/options");
const papers = require("./model/paper");
const contactData = require("./model/contactData");

const app = express();
const router = express.Router();

const port = process.env.PORT || 3000;

app.use(express.static("./static"));
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());

app.get("/courses", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./static/courses.html"));
});

app.get("/about", (req, res) => {
  res.sendFile(path.resolve(__dirname, "./static/about.html"));
});

app.post("/contact", async (req, res) => {
  const data = new contactData(req.body);
  data
    .save()
    .then(() => {
      res.status(200).json({
        msg: "Your message is saved. Our team will contact you shortly on the email.",
      });
    })
    .catch((err) => {
      res.status(400).json({ msg: "Please provide correct credentials" });
    });
});

app.get("/courses/options/api/:coursename", async (req, res) => {
  const courseName = req.params.coursename;
  const optionsData = await options.find({ courseName: courseName });

  res.status(200).json({ data: optionsData });
});

app.get("/courses/options/api/paper/:paperdetails", async (req, res) => {
  try {
    const paperDetails = await papers.findOne({
      paperName: req.params.paperdetails,
    });
    res.status(200).json({ paperDetails });
  } catch (error) {
    console.log(error);
  }
});

app.listen(port, () => {
  const start = async () => {
    try {
      await connectDB(process.env.MONGO_URI);
      console.log(`Server is listening to the port ${port}`);
    } catch (error) {
      console.log(error);
    }
  };
  start();
});
