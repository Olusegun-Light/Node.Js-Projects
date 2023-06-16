const mongoose = require("mongoose");

// Describing a schema
const tourSchema = new mongoose.Schema({
  name: {
    // Schema type options
    type: String,
    required: [true, "A tour must have a name"],
    unique: true,
  },
  rating: {
    type: Number,
    default: 4.5,
  },
  price: {
    // Schema type options
    type: Number,
    required: [true, "A tour must have a price"],
  },
});
// Model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
