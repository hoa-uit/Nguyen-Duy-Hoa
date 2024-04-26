import { getBookService } from '@application/index';
import logger from '@config/logger';

export const updateBookHandler = async (request, response, next) => {
    try {
        logger.info(`${updateBookHandler.name} received request`);

        const bookService = getBookService();
        await bookService.updateBook(request.params?.id, request.body?.book);

        logger.info(`${updateBookHandler.name} update book successfully`);

        response.sendStatus(204);
    } catch (error) {
        logger.error(`${updateBookHandler.name} has failed`);
        next(error);
    }
};
