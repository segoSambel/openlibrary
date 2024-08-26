import {BookResponse, CreateBookRequest, toBookResponse, UpdateBookRequest} from "../model/book-model";
import {Validation} from "../validation/validation";
import {BookValidation} from "../validation/book-validation";
import {prismaClient} from "../application/database";
import {v4 as uuid} from "uuid";
import {ResponseError} from "../error/response-error";

export class BookService {

    static async create(request: CreateBookRequest): Promise<BookResponse> {
        const createRequest = Validation.validate(BookValidation.CREATE, request);

        const book = await prismaClient.book.create({
            data: {
                id: uuid(),
                title: createRequest.title,
                category: createRequest.category,
                cover: createRequest.cover,
                overview: createRequest.overview,
                isbn: createRequest.isbn,
                publication_year: createRequest.publicationYear,
                publisher_id: createRequest.publisherId,
                author_id: createRequest.authorId
            },
            include: {author: true, publisher: true}
        });

        return toBookResponse(book)
    }

    static async get(bookId: string): Promise<BookResponse> {
        const book = await prismaClient.book.findUnique({
            where: {
                id: bookId
            },
            include: {author: true, publisher: true}
        });

        if (!book) {
            throw new ResponseError(404, "Book not found");
        }

        return toBookResponse(book);
    }

    static async update(request: UpdateBookRequest) {
        const updateRequest = Validation.validate(BookValidation.UPDATE, request);

        const book = await prismaClient.book.findUnique({
            where: {
                id: updateRequest.id
            }
        });

        if (!book) {
            throw new ResponseError(404, "Book not found");
        }

        if (updateRequest.title) {
            book.title = updateRequest.title
        }

        if (updateRequest.category) {
            book.category = updateRequest.category
        }

        if (updateRequest.cover) {
            book.cover = updateRequest.cover
        }

        if (updateRequest.overview) {
            book.overview = updateRequest.overview
        }

        if (updateRequest.isbn) {
            book.isbn = updateRequest.isbn
        }

        if (updateRequest.publicationYear) {
            book.publication_year = updateRequest.publicationYear
        }

        if (updateRequest.publisherId) {
            book.publisher_id = updateRequest.publisherId
        }

        if (updateRequest.authorId) {
            book.author_id = updateRequest.authorId
        }

        const newBook = await prismaClient.book.update({
            where: {
                id: book.id
            },
            data: book,
            include: {author: true, publisher: true}
        });

        return toBookResponse(newBook);
    }

    static async delete(bookId: string) {
        const book = await prismaClient.book.findUnique({
            where: {
                id: bookId
            }
        });

        if (!book) {
            throw new ResponseError(404, "Cannot find book");
        }

        await prismaClient.book.delete({
            where: {
                id: bookId
            }
        });
    }
}
