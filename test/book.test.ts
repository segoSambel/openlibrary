import {AuthorTest, BookTest, PublisherTest, UserTest} from "./test-util";
import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";

describe('POST /api/books', () => {

    beforeEach(async () => {
        await UserTest.create();
        await PublisherTest.create();
        await AuthorTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
        await PublisherTest.delete();
        await AuthorTest.delete();
        await BookTest.delete();
    });

    it('should failed to add book if request is invalid', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "",
                category: "",
                cover: "",
                overview: "",
                isbn: "",
                publicationYear: "",
                publisherId: "",
                authorId: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to add book if request is valid', async () => {
        const token = await UserTest.getToken();
        const publisher = await PublisherTest.get();
        const author = await AuthorTest.get();

        const response = await supertest(web)
            .post('/api/books')
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "test_book",
                category: "test_book_category",
                cover: "test_book_cover",
                overview: "test_book_overview",
                isbn: "test_book_isbn",
                publicationYear: "2024",
                publisherId: publisher.id,
                authorId: author.id
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.title).toBe("test_book");
        expect(response.body.data.category).toBe("test_book_category");
        expect(response.body.data.cover).toBe("test_book_cover");
        expect(response.body.data.overview).toBe("test_book_overview");
        expect(response.body.data.isbn).toBe("test_book_isbn");
        expect(response.body.data.publicationYear).toBe("2024");
        expect(response.body.data.publisher.id).toBe(publisher.id);
        expect(response.body.data.author.id).toBe(author.id);
    });
});

describe('GET /api/books', () => {

    beforeEach(async () => {
        await UserTest.create();
        await PublisherTest.create();
        await AuthorTest.create();

        Promise.all([await PublisherTest.get(), await AuthorTest.get()]).then(async (values) => {
            await BookTest.create(values[0].id, values[1].id);
        }).catch((e) => {
            throw new Error("Failed to start test")
        });
    });

    afterEach(async () => {
        await UserTest.delete();
        await PublisherTest.delete();
        await AuthorTest.delete();
        await BookTest.delete();
    });

    it('should failed to get book if id is not exist', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .get('/api/books/id_yang_salah')
            .set('Authorization', `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to get book if id is exist', async () => {
        const token = await UserTest.getToken();
        const book = await BookTest.get();

        const response = await supertest(web)
            .get(`/api/books/${book.id}`)
            .set('Authorization', `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.body.data.title).toBe(book.title);
        expect(response.body.data.category).toBe(book.category);
        expect(response.body.data.cover).toBe(book.cover);
        expect(response.body.data.overview).toBe(book.overview);
        expect(response.body.data.isbn).toBe(book.isbn);
        expect(response.body.data.publicationYear).toBe(book.publication_year);
        expect(response.body.data.publisher.id).toBe(book.publisher_id);
        expect(response.body.data.author.id).toBe(book.author_id);
    });
});

describe('PUT /api/books', () => {

    beforeEach(async () => {
        await UserTest.create();
        await PublisherTest.create();
        await AuthorTest.create();

        Promise.all([await PublisherTest.get(), await AuthorTest.get()]).then(async (values) => {
            await BookTest.create(values[0].id, values[1].id);
        }).catch((e) => {
            throw new Error("Failed to start test")
        });
    });

    afterEach(async () => {
        await UserTest.delete();
        await PublisherTest.delete();
        await AuthorTest.delete();
        await BookTest.delete();
    });

    it('should failed to update book if data is invalid', async () => {
        const token = await UserTest.getToken();
        const book = await BookTest.get();

        const response = await supertest(web)
            .put(`/api/books/${book.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "",
                category: "",
                cover: "",
                overview: "",
                isbn: "",
                publicationYear: "",
                publisherId: "",
                authorId: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to update book if data is valid', async () => {
        const token = await UserTest.getToken();
        const book = await BookTest.get();

        const response = await supertest(web)
            .put(`/api/books/${book.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                title: "updated_test_title",
                category: "updated_test_category",
                cover: "updated_test_cover",
                overview: "updated_test_overview",
                isbn: "updated_test_isbn",
                publicationYear: "2024",
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Book updated successfully");
        expect(response.body.data.title).toBe("updated_test_title");
        expect(response.body.data.category).toBe("updated_test_category");
        expect(response.body.data.cover).toBe("updated_test_cover");
        expect(response.body.data.overview).toBe("updated_test_overview");
        expect(response.body.data.isbn).toBe("updated_test_isbn");
        expect(response.body.data.publicationYear).toBe("2024");
    });
});
