import { createLogger, format, transports } from 'winston';

const { combine, timestamp, printf, colorize, align, errors, json } = format;

// for development environment
const devLogger = {
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A',
    }),
    align(),
    printf((info) => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [new transports.Console()],
};

// for production environment
const prodLogger = {
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new transports.File({
      filename: 'error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'combine.log',
      level: 'info',
    }),
  ],
};

// export log instance based on the current environment
const instanceLogger =
  process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
