const winston = require("winston");
const express = require("express");
const app = express();
app.use(function (req, res, next) {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Methods", "GET, POST, PUT, DELETE");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Credentials", true);
  next();
});
require("./startup/routes")(app);
require("./startup/databaseStartup")();
require("./startup/extraTools")(app);
require("./startup/validation")();
require("./startup/logging")();
require("./startup/config");

const port = 3001;
app.listen(port, () => {
  winston.info(`listening at port ${port}`);
});
