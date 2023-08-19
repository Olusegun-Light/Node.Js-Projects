//  Import data from the json file into the database
const fs = require("fs");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Tour = require("./../../models/tourModel");
const User = require("./../../models/userModel");
const Review = require("./../../models/reviewModel");

dotenv.config({ path: "./config.env" });
// console.log(process.env);

const DB = process.env.DATABASE.replace(
  "<PASSWORD>",
  process.env.DATABASE_PASSWORD
);

mongoose
  .connect(DB, {
    useNewUrlParser: true,
    useCreateIndex: true,
    useFindAndModify: false,
  })
  .then(() => {
    // console.log(con.connections);
    console.log(":: Database  Connector Established ::");
  });

//  Read JSON File
const tours = JSON.parse(
  // Import tours json data
  fs.readFileSync(`${__dirname}/tours.json`, "utf-8")
);

const users = JSON.parse(
  // Import tours json data
  fs.readFileSync(`${__dirname}/users.json`, "utf-8")
);

const reviews = JSON.parse(
  // Import tours json data
  fs.readFileSync(`${__dirname}/reviews.json`, "utf-8")
);

// Import data into database
const importData = async () => {
  try {
    await Tour.create(tours);
    await User.create(users, { validateBeforeSave: false });
    await Review.create(reviews);
    console.log("Data successfully loaded!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

// Delete All Data from db
const deleteData = async () => {
  try {
    await Tour.deleteMany();
    await User.deleteMany();
    await Review.deleteMany();

    console.log("Data successfully deleted!");
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if (process.argv[2] === "--import") {
  importData();
} else if (process.argv[2] === "--delete") {
  deleteData();
}

console.log(process.argv);

// Import
// node ./dev-data/data/import-dev-data.js --import

// Delete
// node ./dev-data/data/import-dev-data.js --delete
