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
