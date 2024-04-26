import logger from '@config/logger';
import { Book } from '@domain/types/book.type';
import { getBadRequestError } from '@server/common/errors';
import * as yup from 'yup';

export class BookValidationService {
    private getSchemaForGetBooksByCondition(): any {
        return yup.object().shape({
            book: yup.object().shape({
                title: yup.string(),
                authors: yup.array().of(yup.string()),
                genre: yup.string(),
            }),
        });
    }

    public async validateRequestBody(book: Book): Promise<Book> {
        logger.info('Validating books in request');
        if (!book) {
            logger.error('Invalid request - request body is missing');
            throw getBadRequestError('Request body is missing');
        }

        try {
            logger.debug('Validating book in request', { book });
            const validationSchema = this.getSchemaForGetBooksByCondition();

            const validatedBook = await validationSchema.validate(book, { stripUnknown: true });

            // const validatedBook = await validationSchema.cast(book);
            logger.info('Validated book in request successfully');
            logger.debug('Validated book in request successfully', { validatedBook });

            return validatedBook;
        } catch (error) {
            logger.error('Request validation is failed', { error });
            throw getBadRequestError('Invalid request body');
        }
    }

    public async validateCreateBookRequest(book: Book): Promise<void> {
        logger.info('Validating create book request');
        if (!book) {
            logger.error('Invalid request - request body is missing');
            throw getBadRequestError('Request body is missing');
        }

        try {
            logger.debug('Validating create book request', { book });
            const validationSchema = yup.object().shape({
                title: yup.string().required(),
                authors: yup.array().of(yup.string()).required(),
                genre: yup.string().required(),
            });

            await validationSchema.validate(book, { stripUnknown: true });

            logger.info('Validated create book request successfully');
            logger.debug('Validated create book request successfully', { book });
        } catch (error) {
            logger.error('Request validation is failed', { error });
            throw getBadRequestError('Invalid request body');
        }
    }
}
