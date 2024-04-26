import { Book as BookType } from '@domain/types/book.type';
import { Sequelize, DataTypes } from 'sequelize';
import { BuildOptions, Model } from 'sequelize';

export class BookModel extends Model<BookType> {}

export type BookStatic = typeof Model & {
    new (values?: object, options?: BuildOptions): BookModel;
};

export const getBookEntity = (sequelize: Sequelize): BookStatic => {
    return sequelize.define(
        'books',
        {
            id: {
                type: DataTypes.UUID,
                primaryKey: true,
                defaultValue: DataTypes.UUIDV4,
                allowNull: false,
            },
            title: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            authors: {
                type: DataTypes.ARRAY(DataTypes.STRING),
                allowNull: false,
            },
            genre: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            isDeleted: {
                type: DataTypes.BOOLEAN,
                allowNull: false,
                field: 'is_deleted',
                defaultValue: false,
            },
            createdAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'created_at',
            },
            updatedAt: {
                type: DataTypes.DATE,
                allowNull: false,
                field: 'updated_at',
            },
        },
        {
            timestamps: true,
            updatedAt: 'updatedAt',
            createdAt: 'createdAt',
        },
    ) as BookStatic;
};
