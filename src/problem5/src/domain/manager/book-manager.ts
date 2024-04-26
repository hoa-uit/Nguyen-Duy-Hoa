import { Book, BookFincCondition } from '@domain/types/book.type';

export interface BookManager {
    createBook(book: Book): Promise<Book>;
    updateBook(id: string, book: Book): Promise<Book>;
    getBook(id: string): Promise<Book>;
    getBooksByCondition(condition: BookFincCondition): Promise<Book[]>;
    softRemoveBook(id: string): Promise<Book>;
    hardRemoveBook(id: string): Promise<Book>;
}
