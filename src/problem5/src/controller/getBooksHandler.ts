import { Request, Response, NextFunction } from 'express';
import logger from '@config/logger';
import { getBookService } from '@application/index';

export const getBooksHandler = async (request: Request, response: Response, next: NextFunction): Promise<void> => {
    try {
        logger.info(`${getBooksHandler.name} received request`);

        const book = request.body?.book;
        const bookService = getBookService();
        const books = await bookService.getBooksByCondition(book);

        logger.info(`${getBooksHandler.name} get books successfully`);
        logger.debug(`${getBooksHandler.name} get books successfully`, { books });

        response.status(200).json(books);
    } catch (error) {
        logger.error(`${getBooksHandler.name} has failed`);
        next(error);
    }
};
