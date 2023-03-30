import { Logger } from '@nestjs/common';
import { Request, Response } from 'express';
import * as winston from 'winston';
import * as DailyRotateFile from 'winston-daily-rotate-file';

const logger = new Logger();

export const winstonLogger = winston.createLogger({
  level: 'info',
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.json()
  ),
  transports: [
    new winston.transports.Console(),
    new DailyRotateFile({
        filename: 'logs/combined-%DATE%.log',
        datePattern: 'YYYY-MM-DD',
        zippedArchive: true,
        maxSize: '20m',
        maxFiles: '14d'
      })
  ]
});

export function logRequest(request: Request, response: Response, next: Function) {
  const { method, originalUrl: url, body, query, params } = request;
  const start = Date.now();

  next();

  const responseTime = Date.now() - start;
  const { statusCode } = response;
  const logObj = { timestamp: new Date(), method, url, body, query, params, responseTime, statusCode };
  winstonLogger.info(logObj);
}

