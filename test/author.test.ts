import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";
import {AuthorTest, UserTest} from "./test-util";

describe('POST /api/authors', () => {

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
        await AuthorTest.delete()
    });

    it('should failed to add author if request is invalid', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .post('/api/authors')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to add author if request is valid', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .post('/api/authors')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "test_author"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Author added successfully");
    });

});

describe('GET /api/authors', () => {

    beforeEach(async () => {
        await UserTest.create();
        await AuthorTest.create();
    });

    afterEach(async () => {
        await AuthorTest.delete();
        await UserTest.delete();
    });

    it('should failed to get author if author id is not exist', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .get('/api/authors/id_yang_salah')
            .set('Authorization', `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to get author if author id is exist', async () => {
        const token = await UserTest.getToken();
        const author = await AuthorTest.get();

        const response = await supertest(web)
            .get(`/api/authors/${author.id}`)
            .set('Authorization', `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(author.id);
        expect(response.body.data.name).toBe(author.name);
    });

});

describe('PUT /api/authors', () => {

    beforeEach( async() => {
        await UserTest.create();
        await AuthorTest.create();
    });

    afterEach(async () => {
        await AuthorTest.delete();
        await UserTest.delete();
    });

    it('should failed to update author if request is invalid', async () => {
        const token = await UserTest.getToken();
        const author = await AuthorTest.get();

        const response = await supertest(web)
            .put(`/api/authors/${author.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to update author if request is valid', async () => {
        const token = await UserTest.getToken();
        const author = await AuthorTest.get();

        const response = await supertest(web)
            .put(`/api/authors/${author.id}`)
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "test_author_baru"
            });

        await AuthorTest.delete("test_author_baru");

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Author updated successfully");
        expect(response.body.data.name).toBe("test_author_baru");
    });
});

describe('DELETE /api/authors', () => {
    
    beforeEach( async() => {
        await UserTest.create();
        await AuthorTest.create();
    });

    afterEach(async () => {
        await AuthorTest.delete();
        await UserTest.delete();
    });

    it('should failed to remove authors id if authorId is invalid', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .delete(`/api/authors/invalid_id`)
            .set('Authorization', `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to delete author if authorId is valid', async () => {
        const token = await UserTest.getToken();
        const author = await AuthorTest.get();

        const response = await supertest(web)
            .delete(`/api/authors/${author.id}`)
            .set('Authorization', `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Author deleted successfully");
    });
});
