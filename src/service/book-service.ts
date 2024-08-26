import {BookResponse, CreateBookRequest, toBookResponse} from "../model/book-model";
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
}
