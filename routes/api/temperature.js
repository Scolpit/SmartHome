const express = require("express");
const router = express.Router();

const Temperature = require("../../models/Temperature");

// @route   GET api/temperature/sensor/:sensorid/:battery/:temperature/:humidity
// @desc    Get sensor by sensorid
// @access  Public
router.get("/sensor/:sensorid/:battery/:temperature/:humidity", (req, res) => {
  Temperature.findOne({ sensorid: req.params.sensorid })
    .then(temp => {
      let responseCode = 0;
      if (temp.ventState && !temp.ventLastState) {
        responseCode = 1;
      }
      if (!temp.ventState && temp.ventLastState) {
        responseCode = 2;
      }

      temp.temperature = req.params.temperature;
      temp.humidity = req.params.humidity;
      temp.battery = req.params.battery;
      temp.ventLastState = temp.ventState;
      temp.updatedAt = Date.now();

      temp.save();
      res.json(responseCode);
    })
    .catch(err => res.json(0));
});

module.exports = router;
