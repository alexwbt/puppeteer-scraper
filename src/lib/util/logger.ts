import { createLogger, format, transports } from 'winston';

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
    new transports.File({ filename: "log/log" }),
  ],
});

export default logger;
