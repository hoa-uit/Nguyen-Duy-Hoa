import { getBookService } from "@application/index";
import logger from "@config/logger";

export const createBookHandler = async (request, response, next) => {
    try {
        logger.info(`${createBookHandler.name} received request`);

        const bookService = getBookService();
        await bookService.createBook(request.body?.book);

        logger.info(`${createBookHandler.name} create book successfully`);

        response.sendStatus(201);
    } catch (error) {
        logger.error(`${createBookHandler.name} has failed`);
        next(error);
    }
};
