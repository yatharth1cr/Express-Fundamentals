### Q. Create a middleware which is similar to morgan(logger) which logs

- requested method
- requested url
- current time

```js
// Import the express module
const express = require("express");

// Create an instance of the express application
const app = express();

// Get the current date and time
var time = new Date();

// Extract seconds, minutes, and hours from the current time
var sec = time.getSeconds();
var min = time.getMinutes();
var hour = time.getHours();

// Middleware function to log the request method, URL, and time
app.use((req, res, next) => {
  // Log the request method, URL, and current time
  console.log(req.method, req.url, `${hour}:${min}:${sec}`);
  // Send a res to the client with same information
  res.send(`${req.method} ${req.url} ${hour}:${min}:${sec}`);
  // Call next() to pass control to the next middleware
  next();
});

// server listen on port 3k
app.listen(3000, () => {
  console.log("Server is listening at PORT 3000");
});
```

### Q. Create a middleware which is similar to express.json()

- parses json data and puts it into req.body

```javascript
// Import the express module
const express = require("express");

// Create an instance of the express application
const app = express();

// Middleware function to parses json data and puts it into req.body
app.use((req, res, next) => {
  req.body = {};
  var data = "";
  req
    .on("data", (chunk) => {
      data += chunk;
    })
    .on("end", () => {
      if (!data) return next();
      if (data && req.headers["content-type"] === "application/json") {
        data = JSON.parse(data);
        req.body = { ...data };
      }
      next();
    });
});

app.post("/form", (req, res) => {
  console.log(req.body);
});

// middleware error handler
app.use((req, res, next) => {
  res.status(404).send("Page not found");
});

// server listen on port 3k
app.listen(3000, () => {
  console.log("Server is listening at PORT 3k");
});
```

### Q. Create a middleware which functions similar to express.static()
