import { getBookService } from "@application/index";
import logger from "@config/logger";

export const getBookHandler = async (request, response, next) => {
    try {
        logger.info(`${getBookHandler.name} received request`);

        const bookService = getBookService();
        const book = await bookService.getBook(request.params?.id);

        logger.info(`${getBookHandler.name} get book successfully`);
        logger.debug(`${getBookHandler.name} get book successfully`, { book });

        response.status(200).json(book);
    } catch (error) {
        logger.error(`${getBookHandler.name} has failed`);
        next(error);
    }
};
