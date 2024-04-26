import { getConnection } from '@config/database';
import logger from '@config/logger';
import { getBookEntity, BookStatic } from '@domain/entity/book';
import { BookManager } from '@domain/manager/book-manager';
import { BookFincCondition, Book as BookType } from '@domain/types/book.type';
import { pickBy } from 'lodash';
import { Op } from 'sequelize';

export class BookRepository implements BookManager {
    private book: BookStatic;

    public async createBookDbInstance() {
        const sequelize = await getConnection();
        const instance = new BookRepository();
        instance.book = getBookEntity(sequelize);

        return instance;
    }

    public async createBook(book: BookType): Promise<BookType> {
        const loggerName = `[${BookRepository.name}.addBook]`;
        logger.info(`${loggerName} start adding new Book`);

        const createdBook = await this.book.create(book);

        logger.info(`${loggerName} new Book added successfully`);
        logger.debug(`${loggerName} new Book added successfully`, { createdBook });

        return createdBook as unknown as BookType;
    }

    public async updateBook(id: string, book: BookType): Promise<BookType> {
        const loggerName = `[${BookRepository.name}.updateBook]`;
        logger.info(`${loggerName} start updating Book by id`, { id, book });

        const updatedBook = await this.book.update(book, { where: { id }, returning: true });

        logger.info(`${loggerName} Book updated successfully`);
        logger.debug(`${loggerName} Book updated successfully`, { updatedBook });

        return updatedBook as unknown as BookType;
    }

    public async getBook(id: string): Promise<BookType> {
        const loggerName = `[${BookRepository.name}.getBook]`;
        logger.info(`${loggerName} start getting Book by id`, { id });

        const book = await this.book.findOne({ where: { id } });

        logger.info(`${loggerName} Book fetched successfully`);
        logger.debug(`${loggerName} Book fetched successfully`, { book });

        return book as unknown as BookType;
    }

    public async getBooksByCondition(fincCondition: BookFincCondition): Promise<BookType[]> {
        const loggerName = `[${BookRepository.name}.getBooksByCondition]`;
        logger.info(`${loggerName} start getting Books by condition`, { fincCondition });

        const { authors } = fincCondition;
        const condition = pickBy({
            ...fincCondition,
            authors: authors && { [Op.in]: authors },
        });

        const books = await this.book.findAll({ where: condition, raw: true });

        logger.info(`${loggerName} Books fetched successfully`);
        logger.debug(`${loggerName} Books fetched successfully`, { books });

        return books as unknown as BookType[];
    }

    public async softRemoveBook(id: string): Promise<BookType> {
        const loggerName = `[${BookRepository.name}.softRemoveBook]`;
        logger.info(`${loggerName} start soft removing Book by id`, { id });

        const book = await this.book.update({ isDeleted: true }, { where: { id } });

        logger.info(`${loggerName} soft removed Book successfully`);
        logger.debug(`${loggerName} soft removed Book successfully`, { book });
        return book as unknown as BookType;
    }

    public async hardRemoveBook(id: string): Promise<BookType> {
        const loggerName = `[${BookRepository.name}.hardRemoveBook]`;
        logger.info(`${loggerName} start hard removing Book by id`, { id });

        const book = await this.book.destroy({ where: { id } });

        logger.info(`${loggerName} hard removed Book successfully`);
        logger.debug(`${loggerName} hard removed Book successfully`, { book });
        return book as unknown as BookType;
    }
}
