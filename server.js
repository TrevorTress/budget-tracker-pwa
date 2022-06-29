const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");
const compression = require("compression");

const PORT = process.env.PORT || 3001;
const MONGODB_URI = process.env.MONGODB_URI || "mongodb://localhost/budget";

const app = express();

app.use(logger("dev"));

app.use(compression());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

mongoose.connect(MONGODB_URI, {
  useNewUrlParser: true,
  useFindAndModify: false 
});

// routes
app.use(require("./routes/api.js"));

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});

// TO-DO:
// - TEST /js/idb.js (18.4)
// - TEST /public/manifest.json (19.5)
// - TEST /public/service-worker.js (19.4)
// - deploy to MongoDB Atlas (18.5)

// GIVEN a budget tracker without an internet connection
// WHEN the user inputs an expense or deposit
// THEN they will receive a notification that they have added an expense or deposit
// WHEN the user reestablishes an internet connection
// THEN the deposits or expenses added while they were offline are added to their transaction history and their totals are updated