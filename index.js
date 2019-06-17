const express = require("express");
const mongoose = require("mongoose");
const path = require("path");

//const users = require("./routes/api/users");
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
app.use("/api/users", users);
app.use("/api/rides", rides);
app.use("/api/cars", cars);

// Server static assets if in production
if (process.env.NODE_ENV === "production") {
  // Set static folder
  app.use(express.static("client/build"));

  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "client", "build", "index.html"));
  });
}

// Listeners
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
