import {prismaClient} from "../src/application/database";
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";
import {JwtUtil} from "../src/util/jwt-util";
import {Author, Publisher, User} from "@prisma/client";

export class UserTest {
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                email: "test@example.com"
            }
        });
    }

    static async create() {
        await prismaClient.user.create({
            data: {
                id: uuid(),
                email: "test@example.com",
                password: await bcrypt.hash("password", 10),
                name: "test",
                address: "test",
                phone: "1234567890"
            }
        });
    }

    static async get(): Promise<User> {
        const user = await prismaClient.user.findFirst({
            where: {
                email: "test@example.com"
            }
        });

        if (!user) {
            throw new Error("User not found");
        }

        return user;
    }

    static async getToken(): Promise<string> {
        const payload = {
            email: "test@example.com",
            name: "test"
        };
        return await JwtUtil.sign(payload)
    }
}

export class AuthorTest {
    static async delete(name: string = "test_author") {
        await prismaClient.author.deleteMany({
            where: {
                name: name
            }
        });
    }

    static async create() {
        await prismaClient.author.create({
            data: {
                id: uuid(),
                name: "test_author"
            }
        })
    }

    static async get(): Promise<Author> {
        const author = await prismaClient.author.findFirst({
            where: {
                name: "test_author"
            }
        });

        if (!author) {
            throw new Error("Author not found");
        }

        return author;
    }
}

export class PublisherTest {
    static async delete(name: string = "test_publisher") {
        await prismaClient.publisher.deleteMany({
            where: {
                name: name
            }
        })
    }

    static async create() {
        await prismaClient.publisher.create({
            data: {
                id: uuid(),
                name: "test_publisher",
                location: "test_publisher_location"
            }
        });
    }

    static async get(): Promise<Publisher> {
        const publisher = await prismaClient.publisher.findFirst({
            where: {
                name: "test_publisher"
            }
        });

        if (!publisher) {
            throw new Error("Publisher not found");
        }

        return publisher
    }
}
