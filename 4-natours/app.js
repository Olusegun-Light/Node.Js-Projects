const express = require("express");
const app = express();
const morgan = require("morgan");

const tourRouter = require("./routes/tourRoute");
const userRouter = require("./routes/userRoute");

// Middleware
app.use(express.json());

//  3rd party middleware
app.use(morgan("dev"));
app.use(express.static(`${__dirname}/public`));

//  Create custom middleware
app.use((req, res, next) => {
  // console.log("hello from the middleware");
  req.requestTime = new Date().toISOString();
  next();
});

//  Specifying Middleware
app.use("/api/v1/tours", tourRouter);
app.use("/api/v1/users", userRouter);

// Server
module.exports = app;
