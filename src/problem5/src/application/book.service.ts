import { Book } from '@domain/types/book.type';
import { BookRepository } from '@repository/book';
import { BookValidationService } from './book.validation';
import { getBadRequestError } from '@server/common/errors';

export class BookService {
    private bookManager: BookRepository;
    private bookValidation: BookValidationService;

    constructor(bookManager: BookRepository, bookValidation: BookValidationService) {
        this.bookManager = bookManager;
        this.bookValidation = bookValidation;
    }

    public async createBook(book: Book): Promise<Book> {
        await this.bookValidation.validateCreateBookRequest(book);

        const bookDbInstance = await this.bookManager.createBookDbInstance();
        
        return bookDbInstance.createBook(book);
    }

    public async updateBook(id: string, book: Book): Promise<Book> {
        if (!id) {
            throw getBadRequestError('Book id is required');
        }

        await this.bookValidation.validateRequestBody(book);

        const bookDbInstance = await this.bookManager.createBookDbInstance();
        return bookDbInstance.updateBook(id, book);
    }

    public async getBook(id: string): Promise<Book> {
        if (!id) {
            throw getBadRequestError('Book id is required');
        }

        const bookDbInstance = await this.bookManager.createBookDbInstance();
        return bookDbInstance.getBook(id);
    }

    public async getBooksByCondition(book: Book): Promise<Book[]> {
        await this.bookValidation.validateRequestBody(book);

        const bookDbInstance = await this.bookManager.createBookDbInstance();
        return bookDbInstance.getBooksByCondition(book);
    }

    public softRemoveBook(id): Promise<Book> {
        return this.bookManager.softRemoveBook(id);
    }

    public async hardRemoveBook(id: string): Promise<Book> {
        if (!id) {
            throw getBadRequestError('Book id is required');
        }

        const bookDbInstance = await this.bookManager.createBookDbInstance();
        return bookDbInstance.hardRemoveBook(id);
    }
}
