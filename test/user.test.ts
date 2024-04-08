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
