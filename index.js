const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const bodyParser = require("body-parser");

const temperature = require("./routes/api/temperature");
//const rides = require("./routes/api/rides");
//const cars = require("./routes/api/cars");

const app = express();
const db =
  "mongodb://tfHXA4SoL2MK:BJkazq2esJ2X@ds139167.mlab.com:39167/smarthome";

// Body parser middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// DB Connection
mongoose
  .connect(db)
  .then(() => {
    console.log("MongoDB connected");
  })
  .catch(err => {
    console.log(err);
  });

// Routes
app.use("/api/temperature", temperature);

// Listeners
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
