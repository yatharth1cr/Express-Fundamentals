const express = require("express");
const app = express();
const logger = require("morgan");

app.use(logger("dev"));

// Middleware to handle /admin route and throw an error
app.use("/admin", (req, res, next) => {
  next("Unauthorized");
});

// GET request on '/'
app.get("/", (req, res) => {
  res.send("Welcome to Home Page");
});

// GET request on '/about'
app.get("/about", (req, res) => {
  res.send("Welcome to About Page");
});

// 404 Error handler Middleware for non-matching routes
app.use((req, res, next) => {
  res.status(404).send("Page Not Found");
});

// custom error handler middleware
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// Server is running
app.listen(4400, () => {
  console.log("Server is listening at 4.4k");
});
