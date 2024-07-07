import { createLogger, format, transports } from 'winston';
import { Client } from '@elastic/elasticsearch';
import { ElasticsearchTransport } from 'winston-elasticsearch';

const { combine, timestamp, printf, colorize, align, errors, json } = format;

const devLogger = {
  level: process.env.LOG_LEVEL || 'info',
  format: combine(
    colorize({ all: true }),
    timestamp({
      format: 'YYYY-MM-DD hh:mm:ss A',
    }),
    align(),
    printf(info => `[${info.timestamp}] ${info.level}: ${info.message}`),
  ),
  transports: [new transports.Console()],
};

const esClient = new Client({ node: 'http://0.0.0.0:5044' });
const esTransportOpts = {
  client: esClient,
};
const esTransport = new ElasticsearchTransport(esTransportOpts);
const prodLogger = {
  format: combine(timestamp(), errors({ stack: true }), json()),
  transports: [
    new transports.File({
      filename: 'logs/error.log',
      level: 'error',
    }),
    new transports.File({
      filename: 'logs/combine.log',
      level: 'info',
    }),
    esTransport,
  ],
};

// export log instance based on the current environment
const instanceLogger = process.env.NODE_ENV === 'production' ? prodLogger : devLogger;

export const instance = createLogger(instanceLogger);
