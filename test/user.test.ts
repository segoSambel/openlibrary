import supertest from "supertest";
import {web} from "../src/application/web";
import {logger} from "../src/application/logging";
import {UserTest} from "./test-util";

describe('POST /api/users', () => {

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should reject if request is invalid', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                email: "",
                password: "",
                name: "",
                address: "",
                phone: ""
            });

        logger.debug(response.body);
        expect(response.status).toBe(400);
        expect(response.body.errors).toBeDefined();
    });

    it('should register new user if request is valid', async () => {
        const response = await supertest(web)
            .post('/api/users')
            .send({
                email: "test@example.com",
                password: "password",
                name: "test",
                address: "test",
                phone: "1234567890"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.message).toBe("User created successfully");
    });
});

describe('POST /api/auth/login', () => {

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should be able to login', async () => {
        const response = await supertest(web)
            .post('/api/auth/login')
            .send({
                email: "test@example.com",
                password: "password"
            });

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.token).toBeDefined();
    });

    it('should failed to login if credential is wrong or not exist', async () => {
        const response = await supertest(web)
            .post('/api/auth/login')
            .send({
                email: "test@example.com",
                password: "salahpoll"
            });

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.body.errors).toBeDefined();
    });
});

describe('GET /api/users/current', () => {

    beforeEach(async () => {
        await UserTest.create();
    });

    afterEach(async () => {
        await UserTest.delete();
    });

    it('should be able to get user', async () => {
        const token = await UserTest.getToken();

        const response = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', `Bearer ${token}`);

        logger.debug(response.body);
        expect(response.status).toBe(200);
        expect(response.body.data.email).toBe('test@example.com')
        expect(response.body.data.name).toBe('test')
        expect(response.body.data.address).toBe('test')
        expect(response.body.data.phone).toBe('1234567890')

    });

    it('should failed to get user if token is invalid', async () => {
        const response = await supertest(web)
            .get('/api/users/current')
            .set('Authorization', `Bearer salahpollll`);

        logger.debug(response.body);
        expect(response.status).toBe(401);
        expect(response.error).toBeDefined();
    });
});
