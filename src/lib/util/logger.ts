import { createLogger, format, transports } from "winston";
import "winston-daily-rotate-file";
import { getEnvString } from "./env";

const { combine, timestamp, printf, colorize, errors, } = format;

const logFormat = printf(({ level, message, timestamp, stack }) => {
  if (stack) {
    return `${timestamp} [${level}]: ${message}\n${stack}`;
  }
  return `${timestamp} [${level}]: ${message}`;
});

const logger = createLogger({
  format: combine(
    errors({ stack: true }),
    colorize(),
    timestamp(),
    logFormat,
  ),
  transports: [
    new transports.Console(),
    new transports.DailyRotateFile({
      dirname: "log",
      filename: "%DATE%.log",
      datePattern: "YYYY-MM-DD",
      zippedArchive: true,
      maxSize: "20m",
      maxFiles: "14d",
    }),
  ],
  level: getEnvString("LOG_LEVEL", "info"),
});

export default logger;
