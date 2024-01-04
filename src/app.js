require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const app = express();
const connectDb = require("./db/connectDb");
const rateLimit = require("express-rate-limit");
const cors = require("cors");

const limiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 100, // Max requests per windowMs
  message: "Too many requests from this IP, please try again later.",
});

app.use(limiter);

// handling uncaught exceptions
process.on("uncaughtException", (err) => {
  console.log(err.name, err.message);
});

// parse requests of content-type - application/json
app.use(express.json());
app.use(cors());

// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

app.use(morgan("dev"));

// set port, listen for requests
const port = process.env.PORT || 8000;
const server = app.listen(port, async () => {
  await connectDb();
  console.log(`server started on ${port}`);
});

require("./routes/index")(app);

// handling Db error
process.on("unhandledRejection", (err) => {
  console.log(err.name, err.message);
  process.exit(1);
});

module.exports = { app, server };
