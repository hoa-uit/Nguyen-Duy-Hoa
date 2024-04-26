import { Dialect, Options, Sequelize } from 'sequelize';
import logger from './logger';

const getConnection = async (): Promise<Sequelize> => {
    const minConnectionPool: number = Number(process.env.MIN_POOL) || 1;
    const maxConnectionPool: number = Number(process.env.MAX_POOL) || 5;

    logger.info(`[${getConnection.name}] Max connection pool: ${maxConnectionPool}`);
    logger.info(`[${getConnection.name}] Min connection pool: ${minConnectionPool}`);
    const username = process.env.POSTGRES_USER;
    const password = process.env.POSTGRES_PASSWORD;
    const database = process.env.POSTGRES_DBNAME;

    const configs: Options = {
        dialect: 'postgres' as Dialect,
        port: Number(process.env.POSTGRES_PORT || 5432),
        ssl: Boolean(process.env.POSTGRES_SSL || true),
        pool: { max: maxConnectionPool, min: minConnectionPool, idle: 10000 },
        host: process.env.POSTGRES_HOST,
    };

    logger.debug('Database sequelize connection config', { configs });
    return new Sequelize(database, username, password, configs);
};

export { getConnection };
