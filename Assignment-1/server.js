const express = require("express");
const app = express();
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// Middleware for logging requests
app.use(logger("dev"));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware to parse JSON bodies
app.use(express.json());

// Middleware to parse FORM data
app.use(express.urlencoded({ extended: true }));

// middleware to send cookie  to the client
app.use((req, res, next) => {
  var count = req.cookies.count;
  if (count) {
    res.cookie("count", Number(count) + 1);
  } else {
    res.cookie("count", 1);
  }
  console.log(count);
  next();
});

// handle route '/'
app.get("/", (req, res) => {
  res.send(`<h2>Welcome to Express</h2>`);
});

// handle route '/about'
app.get("/about", (req, res) => {
  res.send("My name is qwerty");
});

// handle route on '/with'
app.post("/form", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// capture params from a route /users/:username
app.get("/user/:username", (req, res) => {
  let username = req.params.username;
  res.send(`<h1>${username}</h1>`);
});

// error middleware for the routes which not handled
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

//error iddleware
app.use((err, req, res, next) => {
  res.status(500).send(err);
});

// server is running
app.listen(3000, () => {
  console.log("Server is listening at port 3k");
});
