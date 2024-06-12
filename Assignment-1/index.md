### Q. Create a package.json file manually with

- name
- description
- version

### Q. Create a package.json with using npm init script with above content

- add express package with exact version of 4.16.4

```
Ans:
npm install express@4.16.4 --save
```

- upgrade it to the latest version

```
Ans:
npm install express@latest --save
```

### Q. Create a basic express server with 2 routes

- add package.json
- install express
- setup an express server
- add a listener on port 3000
- handle these routes
  1.  GET -> / with HTML response saying 'Welcome to express' in H2.
  2.  GET -> /about with plain text content saying 'My name is qwerty'

```js
const express = require("express");
const app = express();

// handle route on '/with'
app.get("/with", (req, res) => {
  res.send(`<h2>Welcome to Express</h2>`);
});

// handle route on '/about'
app.get("/about", (req, res) => {
  res.send("My name is qwerty");
});

// server is running
app.listen(3000, () => {
  console.log("Server is listening at port 3k");
});
```

### Q. Modify above application, add appropriate middleware

- to capture form data from request
- to capture json data from request
- add POST request on /form route to capture form data from postman and send entire form data through response in json format
- add POST request on /json route to capture JSON data from postman and send entire data in response in plain text format.
- json and form data should include fields
  - name
  - age
  - email

**Note:-**

Remember to add middlewares before handling any routes.

```js
const express = require("express");
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// handle route on '/with'
app.post("/form", (req, res) => {
  console.log(req.body);
  res.json(req.body);
});

// handle route on '/about'
app.get("/json", (req, res) => {
  console.log(req.body);
  res.send(req.body);
});

// server is running
app.listen(3000, () => {
  console.log("Server is listening at port 3k");
});
```

### Q. Modify above application to include

- logger middleware
- cookieParser middleware
- add a middleware to send cookie to the client.

```js
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

// server is running
app.listen(3000, () => {
  console.log("Server is listening at port 3k");
});
```

### Q. Modify above application to include

- a router to capture params from the request on a route /users/:username using GET request.
- capture the username and respond with username in HTML response.

```js
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

// capture params from a route /users/:username
app.get("/user/:username", (req, res) => {
  let username = req.params.username;
  res.send(`<h1>${username}</h1>`);
});

// server is running
app.listen(3000, () => {
  console.log("Server is listening at port 3k");
});
```

### Q. Modify above to include error handler middleware

- a 404 handler for routes which are not handled
- a 500 handler for client/server error

**Note:-**

Remember to add error handler middlewares after handling all the routes in the application

```js
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

// Error middleware
app.use("/admin", (req, res, next) => {
  next("unauthorized");
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
```
