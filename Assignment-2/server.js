const express = require("express");
const app = express();
const logger = require("morgan");
const cookieParser = require("cookie-parser");

// middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(__dirname + "/public"));
app.use(logger("dev"));

// sample routes
app.get("/", (req, res) => {
  res.send(`<h1>Hello Express!</h1>`);
});
app.get("/users", (req, res) => {
  res.send(`<h1>Users :=) Hello Users!</h1>`);
});

// rendered page routed
app.get("/home", (req, res) => {
  res.sendFile(__dirname + "/home.html");
});

app.get("/about", (req, res) => {
  res.sendFile(__dirname + "/about.html");
});

app.get("/service", (req, res) => {
  res.sendFile(__dirname + "/service.html");
});

// error middleware
app.use((req, res) => {
  res.status(404).send("Page Not Found!");
});

//Server is running
app.listen(4000, () => {
  console.log("Server is listening at PORT 4k");
});
