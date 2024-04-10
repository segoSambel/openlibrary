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
