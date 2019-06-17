const express = require("express");
const router = express.Router();

const Temperature = require("../../models/Temperature");

/*
// @route   GET api/cars/:id
// @desc    Get car by id
// @access  Public
router.get("/:id", (req, res) => {
  Temperature.findById(req.params.id)
    .populate("user", ["name", "avatar"])
    .populate("chat.user", ["name", "avatar"])
    .then(car => returnCarWithRides(car, res))
    .catch(err => res.status(404).json({ nocarsfound: "Car not found" }));
});
*/

module.exports = router;
