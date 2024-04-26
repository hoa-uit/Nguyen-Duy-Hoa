export interface Book {
    id: string;
    title: string;
    authors: string[];
    genre: string;
    isDeleted: boolean;
    createdAt: Date;
    updatedAt: Date;
}

export interface BookFincCondition {
    id?: string;
    title?: string;
    authors?: string[];
    genre?: string;
}
