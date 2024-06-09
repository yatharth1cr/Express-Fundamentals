// require
const express = require("express");
const app = express();

const logger = require("morgan");
const cookieParser = require("cookie-parser");

// Middleware for logging requests
app.use(logger("dev"));

// Middleware for parsing cookies
app.use(cookieParser());

// Middleware for setting a cookie when requested on /about route
app.use("/about", (req, res, next) => {
  var cookie = req.cookies.username;
  console.log(cookie);
  if (cookie) {
    res.send("Cookie already set: " + cookie);
  } else {
    res.cookie("username", "yatharth");
    res.send("Cookie is set");
  }
});

// Middleware to fetch all cookies from the request
app.use((req, res, next) => {
  console.log("All Cookies: ", req.cookies);
  next();
});

// A sample route to test the middleware
app.get("/", (req, res) => {
  res.send("Home page");
});

// Server is running
app.listen(4000, () => {
  console.log("Server is listening at port 4000");
});
