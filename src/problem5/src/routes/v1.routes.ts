import { createBookHandler } from '@server/controller/createBookHandler';
import { getBookHandler } from '@server/controller/getBookHandler';
import { getBooksHandler } from '@server/controller/getBooksHandler';
import { hardDeletedBookHandler } from '@server/controller/hardDeletedBookHandler';
import { updateBookHandler } from '@server/controller/updateBookHandler';
import express from 'express';

const v1Router = express.Router();

v1Router.post('/books', getBooksHandler);
v1Router.get('/book/:id', getBookHandler);
v1Router.delete('/book/:id', hardDeletedBookHandler);
v1Router.patch('/book/:id', updateBookHandler);
v1Router.post('/book', createBookHandler);

export default v1Router;
