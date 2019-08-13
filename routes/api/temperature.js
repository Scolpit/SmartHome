const express = require("express");
const router = express.Router();

const Temperature = require("../../models/Temperature");

// @route   GET api/temperature/sensor/:sensorid/:battery/:temperature/:humidity
// @desc    Get sensor by sensorid
// @access  Public
router.get("/sensor/:sensorid/:battery/:temperature/:humidity", (req, res) => {
  Temperature.findOne({ sensorId: req.params.sensorid })
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

      temp.save().then(temperature => {
        res.json(responseCode);
      });
    })
    .catch(err => res.json(0));
});

// @route   GET api/temperature/create/:sensorid/:name
// @desc    Create Temperature
// @access  Public
router.get("/create/:sensorid/:name", (req, res) => {
  const newTemperature = new Temperature({
    sensorId: req.params.sensorid,
    name: req.params.name
  });

  newTemperature.save().then(temperature => {
    res.json(temperature);
  });
});

// @route   GET api/temperature/getall
// @desc    Get All Temperatures
// @access  Public
router.get("/getall", (req, res) => {
  Temperature.find()
    .then(temperature => res.json(temperature))
    .catch(err => res.status(404).json({ error: "No temp found" }));
});

// @route   GET api/temperature/openclosevent/:sensorid
// @desc    Open or Close Vent
// @access  Public
router.get("/openclosevent/:sensorid", (req, res) => {
  Temperature.findOne({ sensorId: req.params.sensorid })
    .then(temp => {
      temp.ventState = !temp.ventState;

      temp.save().then(temperature => {
        res.json(temp);
      });
    })
    .catch(err => res.json(0));
});

module.exports = router;
