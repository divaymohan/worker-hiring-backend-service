const winston = require("winston");
const { createLogger, format, transports } = require("winston");
const { combine, timestamp, label, prettyPrint, colorize } = format;
require("winston-mongodb");
require("express-async-errors");

module.exports = function () {
  winston.exceptions.handle(
    new winston.transports.File({ filename: "exceptions.log" })
  );
  const logger = createLogger({
    format: combine(
      label({ label: "something wrong" }),
      timestamp(),
      prettyPrint(),
      colorize()
    ),
    transports: [
      new transports.Console({
        handleExceptions: true,
      }),
    ],
  });
  process.on("unhandledRejection", (ex) => {
    throw ex;
  });
  winston.add(
    new winston.transports.File({
      filename: "logger.log",
      level: "info",
    })
  );
};
