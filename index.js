const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

const temperature = require("./routes/api/temperature");

const app = express();
const db =
  "mongodb://tfHXA4SoL2MK:BJkazq2esJ2X@ds139167.mlab.com:39167/smarthome";

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
