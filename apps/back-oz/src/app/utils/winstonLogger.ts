import { TransformableInfo } from 'logform';
import { DateTime } from 'luxon';
import { join } from 'path';
import {
  createLogger as createWinston,
  format,
  Logger,
  transports as allTransports,
} from 'winston';
import WistonDailyRotator from 'winston-daily-rotate-file';

export type Level =
  | 'silly'
  | 'debug'
  | 'verbose'
  | 'http'
  | 'info'
  | 'warn'
  | 'error';
export const PATH_TO_LOGS = './logs';

export enum LevelEnum {
  silly = 0,
  debug = 1,
  verbose = 2,
  http = 3,
  info = 4,
  warn = 5,
  error = 6,
}

const { combine, timestamp, printf } = format;

const outputFormat = printf(
  // eslint-disable-next-line
  ({ level, message }: TransformableInfo) => {
    return `${DateTime.utc().toFormat(
      'yyyy-MM-dd HH:mm:ss.SSS'
    )} [${level[0].toUpperCase()}]: ${message}`;
  }
);

/**
 * Creates a new Logger with the given name, and returns it.
 *
 * As the logName is used in the log filename, it must not
 * contains characters that could interfers with the path ('/', '', ':', ...')
 *
 * @param {string} logName The log name
 *
 * @returns {winston.LoggerInstance} The logger.
 */
const createLogger = (logName?: string, level: Level = 'debug'): Logger => {
  const logPath = logName ? join(PATH_TO_LOGS, logName) : PATH_TO_LOGS;

  const fileTransport = logName
    ? new WistonDailyRotator({
        datePattern: 'YYYY-MM-DD',
        filename: join(logPath, `${logName}${level}_%DATE%.log`),
        level,
        maxFiles: 7,
        maxSize: 100000000,
      })
    : undefined;

  const transports = fileTransport
    ? [new allTransports.Console(), fileTransport]
    : [new allTransports.Console()];

  return createWinston({
    format: combine(timestamp(), outputFormat),
    transports,
  });
};

export const infologger = createLogger('info');
export const errorlogger = createLogger('error'); //didn't manage to make it work
