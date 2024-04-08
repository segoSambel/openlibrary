import {prismaClient} from "../src/application/database";
import {v4 as uuid} from "uuid";
import bcrypt from "bcrypt";

export class UserTest {
    static async delete() {
        await prismaClient.user.deleteMany({
            where: {
                email: "test@example.com"
            }
        })
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
        })
    }
}
