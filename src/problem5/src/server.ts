import dotenv from 'dotenv';
import express from 'express';
import compression from 'compression';
import v1Router from './routes/v1.routes';
import logger from '@config/logger';
import * as moduleAlias from 'module-alias';
import { errorHandler } from './common/errors';

const sourcePath = process.env.NODE_ENV === 'development' ? 'src' : __dirname;
moduleAlias.addAliases({
    '@application': `${sourcePath}/application`,
    '@config': `${sourcePath}/config`,
    '@common': `${sourcePath}/common`,
    '@controller': `${sourcePath}/controller`,
    '@domain': `${sourcePath}/domain`,
    '@repository': `${sourcePath}/repository`,
    '@server': sourcePath,
});

dotenv.config();

const app = express();

app.use(compression());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get('/health', (_, res) => res.status(200).send('OK'));
app.use('/v1', v1Router);
app.use(errorHandler);

app.listen(process.env.PORT, () => {
    logger.info(`Server is running at http://localhost:${process.env.PORT}`);
});
