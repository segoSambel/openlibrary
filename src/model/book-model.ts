import {Author, Book, Prisma, Publisher} from "@prisma/client";

export type BookResponse = {
    id: string,
    title: string,
    category: string,
    cover: string,
    overview: string,
    isbn: string,
    publicationYear: string,
    publisher: Publisher,
    author: Author,
};

export type CreateBookRequest = {
    title: string,
    category: string,
    cover: string,
    overview: string,
    isbn: string,
    publicationYear: string,
    publisherId: string,
    authorId: string
}

export type UpdateBookRequest = {
    id: string,
    title: string,
    category: string,
    cover: string,
    overview: string,
    isbn: string,
    publicationYear: string,
    publisherId: string,
    authorId: string
}

export function toBookResponse(data: Prisma.BookGetPayload<{ include: {author: true, publisher: true} }>): BookResponse {
    return {
        id: data.id,
        title: data.title,
        category: data.category,
        cover: data.cover,
        overview: data.overview,
        isbn: data.isbn,
        publicationYear: data.publication_year,
        publisher: data.publisher,
        author: data.author
    }
}
