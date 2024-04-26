import winston from 'winston';
import { environment } from './environment';

const logger = winston.createLogger({
    level: environment.LOG_LEVEL,
    format: winston.format.combine(
        winston.format.timestamp(),
        winston.format.json(),
        winston.format.prettyPrint(),
        winston.format.timestamp(),
    ),
    transports: [new winston.transports.Console(), new winston.transports.File({ filename: 'combined.log' })],
    exitOnError: false,
});

export default logger;
