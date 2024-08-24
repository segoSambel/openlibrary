import {PublisherTest, UserTest} from "./test-util";
import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";

describe('POST /api/publishers', () => {

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
       await UserTest.delete();
       await PublisherTest.delete();
    });

    it('should failed to add new publisher if request is invalid', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .post('/api/publishers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "",
                location: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to add new publisher if request is valid', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .post('/api/publishers')
            .set('Authorization', `Bearer ${token}`)
            .send({
                name: "test_publisher",
                location: "test_publisher_location"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("Publisher added successfully");
    });
});

describe('GET /api/publishers', () => {

    beforeEach(async () => {
        await UserTest.create();
        await PublisherTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
        await PublisherTest.delete();
    });

    it('should failed to get publisher if id is not exist', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .get('/api/publishers/id_yang_salah')
            .set('Authorization', `Bearer ${token}`)

        logger.debug(response.body);
        expect(response.status).toBe(404);
        expect(response.body.errors).toBeDefined();
    });

    it('should success to get publisher if id is exist', async () => {
        const token = await UserTest.getToken();
        const publisher = await PublisherTest.get();

        const response = await supertest(web)
            .get(`/api/publishers/${publisher.id}`)
            .set('Authorization', `Bearer ${token}`)

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.id).toBe(publisher.id);
        expect(response.body.data.name).toBe(publisher.name);
        expect(response.body.data.location).toBe(publisher.location);
    });
});
