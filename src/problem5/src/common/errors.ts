import logger from '@config/logger';
import { ErrorRequestHandler } from 'express';

const baseErrors = (statusCode: string, message: string, details: string, errorId: string = 'NA') => {
    return {
        statusCode,
        body: JSON.stringify({
            errorId,
            message,
            details,
        }),
    };
};

const getNotFoundError = (errorId: string = 'NA') => {
    return baseErrors('404', 'Not Found', errorId);
};

const getBadRequestError = (details: string = '', errorId: string = 'NA') => {
    return baseErrors('400', 'Bad Request', details, errorId);
};

const getInternalServerError = (errorId: string = 'NA') => {
    return baseErrors('500', 'Internal Server Error', errorId);
};

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
    logger.error('errorHandler - Error occurred', { error });

    if (!error.statusCode) error = getInternalServerError();

    response.status(error.statusCode).json(JSON.parse(error.body));
};

export { getNotFoundError, getBadRequestError, getInternalServerError, errorHandler };
