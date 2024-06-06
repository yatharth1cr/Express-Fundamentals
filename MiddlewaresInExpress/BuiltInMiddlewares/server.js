const express = require("express");
const app = express();

// Middleware for logging request method and URL
app.use("/", (req, res, next) => {
  console.log(req.method, req.url);
  next();
});

// Middleware to parse JSON bodies
app.use(express.json());

// Route handler for POST requests to /json
app.post("/json", (req, res) => {
  console.log(req.body);
  res.send("JSON received");
});

// Middleware to parse FORM data
app.use(express.urlencoded({ extended: true }));

// Route handler for POST requests to /contact
app.post("/contact", (req, res) => {
  console.log(req.body);
  res.send("FORM received");
});

// Middleware to serve static files
app.use(express.static(__dirname + "/public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/index.html");
});
// Start the server
app.listen(3333, () => {
  console.log("Server listening at Port 3333");
});
