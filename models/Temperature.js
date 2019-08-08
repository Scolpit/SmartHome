const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TemperatureSchema = new Schema({
  sensorId: { type: String, required: true },
  name: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  battery: { type: Number, min: 0, max: 100 },
  temperature: { type: Number },
  humidity: { type: Number, min: 0, max: 100 },
  ventState: { type: Boolean, default: false },
  ventLastState: { type: Boolean, default: false }
});

module.exports = Temperature = mongoose.model("temperature", TemperatureSchema);
