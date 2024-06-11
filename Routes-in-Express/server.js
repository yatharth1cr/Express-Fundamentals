const express = require("express");
const logger = require("morgan");

const app = express();

// Middleware for logging requests
app.use(logger("dev"));

// Middleware to parse JSON and URL-encoded bodies
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// GET request on '/' route and render 'index.html'
app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});

// GET request on '/new' route and render 'new.html'
app.get("/new", (req, res) => {
  res.sendFile(__dirname + "/new.html");
});

// POST request on '/new' route and display submitted form data
app.post("/new", (req, res) => {
  console.log(req.body);
  res.send(
    `<h2> ${req.body.name}</h2><p> ${req.body.email} </p><p> ${req.body.age}</p><p>${req.body.username} </p>`
  );
});

app.get("/users/:username", (req, res) => {
  var username = req.params.username;
  res.send(username);
});

// server is running
app.listen(4040, () => {
  console.log("Server is listening at PORT 4k");
});
