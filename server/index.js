const express = require("express");
const startApplication = require("./expressApp");
const dbConnection = require("./db/connection");
require("dotenv").config();

const app = express();

dbConnection(process.env.DB_URI)
  .then((connected) => {
    startApplication(app);
  })
  .catch((e) => {
    console.error("Error connecting to the database:", error);
  });

process.on("unhandledRejection", (reason, promise) => {
  console.error("Unhandled Rejection at:", promise, "reason:", reason);
});

process.on("uncaughtException", (error) => {
  console.error("Uncaught Exception:", error);
  process.exit(1);
});
