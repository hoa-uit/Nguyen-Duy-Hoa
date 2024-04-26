import { getBookService } from '@application/index';
import logger from '@config/logger';

export const hardDeletedBookHandler = async (request, response, next) => {
    try {
        logger.info(`${hardDeletedBookHandler.name} received request`);

        const bookService = getBookService();
        await bookService.hardRemoveBook(request.params?.id);

        logger.info(`${hardDeletedBookHandler.name} remove book successfully`);

        response.sendStatus(204);
    } catch (error) {
        logger.error(`${hardDeletedBookHandler.name} has failed`);
        next(error);
    }
};
