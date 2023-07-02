const mongoose = require("mongoose");
const slugify = require("slugify");

// Describing a schema
const tourSchema = new mongoose.Schema(
  {
    name: {
      // Schema type options
      type: String,
      required: [true, "A tour must have a name"],
      unique: true,
      trim: true,
      maxlength: [
        40,
        "A tour name must have less or equal than 40 characters ",
      ],
      minlength: [
        10,
        "A tour name must have more or equal than 10 characters ",
      ],
    },
    slug: String,
    duration: {
      type: Number,
      required: [true, "A tour must have a duration"],
    },
    maxGroupSize: {
      type: Number,
      required: [true, "A tour must have a group size"],
    },
    difficulty: {
      type: String,
      required: [true, "A tour must have a difficulty"],
      enum: {
        values: ["easy", "medium", "difficult"],
        message: "Difficulty is either easy medium or difficult",
      },
    },
    ratingsAverage: {
      type: Number,
      default: 4.5,
      min: [1, "Rating must be above 1.0"],
      max: [5, "Rating must be below 5.0"],
    },
    ratingsQuantity: {
      type: Number,
      default: 0,
    },
    price: {
      // Schema type options
      type: Number,
      required: [true, "A tour must have a price"],
    },
    priceDiscount: Number,
    summary: {
      type: String,
      trim: [true, "A tour must have a description"],
    },
    description: {
      type: String,
      trim: true,
    },
    imageCover: {
      type: String,
      required: [true, "A tour must have a cover image"],
    },
    images: [String],
    createdAt: {
      type: Date,
      default: Date.now(),
      select: false,
    },
    startDates: [Date],
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

// Virtual Properties
// Convert Date to Weeks
tourSchema.virtual("durationWeeks").get(function () {
  return this.duration / 7;
});

// Document middleware (runs before the .save() and .create())
tourSchema.pre("save", function (next) {
  this.slug = slugify(this.name, { lower: true });
  next();
});

// tourSchema.pre("save", function (next) {
//   console.log("will save document");
//   next();
// });

// tourSchema.post("save", function (doc, next) {
//   console.log(doc);
//   next();
// });

//  Query middleware
tourSchema.pre(/^find/, function (next) {
  this.find({ secreteTour: { $ne: true } });

  this.start = Date.now();
  next();
});

// Post middleware for find
tourSchema.post(/^find/, function (docs, next) {
  console.log(`Query took ${Date.now - this.start}  milliseconds!`);
  // console.log(docs);
  next();
});

// Aggregation Middleware
tourSchema.pre("aggregate", function (next) {
  this.pipeline().unshift({ $match: { secreteTour: { $ne: true } } });
  console.log(this.pipeline());
  next();
});

// Model
const Tour = mongoose.model("Tour", tourSchema);

module.exports = Tour;
