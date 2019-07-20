const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const TemperatureSchema = new Schema({
  sensorId: { type: String, required: true },
  updatedAt: { type: Date, default: Date.now },
  battery: { type: Number, min: 0, max: 100 },
  temperature: Schema.Types.Decimal128,
  humidity: Schema.Types.Decimal128,
  ventState: { type: Boolean, default: false },
  ventLastState: { type: Boolean, default: false }
});

module.exports = Temperature = mongoose.model("temperature", TemperatureSchema);
