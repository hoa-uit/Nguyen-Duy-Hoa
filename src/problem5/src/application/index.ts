import { BookRepository } from '@repository/book';
import { BookService } from './book.service';
import { BookValidationService } from './book.validation';

let bookService: BookService;

const getBookService = (): BookService => {
    if (!bookService) {
        bookService = new BookService(new BookRepository(), new BookValidationService());
    }
    return bookService;
};

export { getBookService };
