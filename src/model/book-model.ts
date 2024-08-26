import {Book} from "@prisma/client";

export type BookResponse = {
    id: string,
    title: string,
    category: string,
    cover: string,
    overview: string,
    isbn: string,
    publicationYear: string,
    publisherId: string,
    authorId: string
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

export function toBookResponse(data: Book): BookResponse {
    return {
        id: data.id,
        title: data.title,
        category: data.category,
        cover: data.cover,
        overview: data.overview,
        isbn: data.isbn,
        publicationYear: data.publication_year,
        publisherId: data.publisher_id,
        authorId: data.author_id
    }
}
