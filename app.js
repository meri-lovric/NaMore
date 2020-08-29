//spinning express app that'll make handling easier
const express = require("express");
const app = express(); //spins up express app that provides utility methods
const morgan = require("morgan"); //calls next function and provides request info in console
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const beachRoutes = require("./api/routes/beaches");
const userRoutes = require("./api/routes/users");
const postRoutes = require("./api/routes/posts");

mongoose.connect(
  "mongodb+srv://na-more:" +
    process.env.MONGO_ATLAS_PW +
    "@na-more.vg2vw.mongodb.net/na-more?retryWrites=true&w=majority",
  { useNewUrlParser: true, useUnifiedTopology: true }
);
mongoose.set('useCreateIndex', true); //to bypass deprication warning:
// collection.ensureIndex is deprecated. Use createIndexes instead.

mongoose.Promise = global.Promise;
  
//MIDDLEWARE
app.use(morgan("dev"));

app.use('/uploads',express.static('uploads'));

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
// handling CORS errors
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*"); //gives access to any client, we can restrict it by changin * --> e.g http://my-page.com
  // not necessarily a protection mechanism
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, Authorization"
  );
  if (req.method === "OPTIONS") {
    res.header("Access-Control-Allow-Methods", "PUT, POST, PATCH, DELETE, GET");
    return res.status(200).json({});
  }
  next();
});
//routes which sould handle requests
app.use("/beaches", beachRoutes); //send status code 200 (everything OK) and json response as an object
//an incoming request has to go through app.use()
//only requests that start with '/beaches' will be handled as the handler that is
//the second argument
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
}); //all requests that haven't been found in previous app.use functions

app.use((error, req, res, next) => {
  res.status(error.status || 500); // our defined error or 505 for any other error
  res.json({
    error: {
      message: error.message,
    },
  });
});
module.exports = app;
