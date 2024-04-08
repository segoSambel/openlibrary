import {CreateUserRequest} from "../model/user-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import bcrypt from "bcrypt";
import {v4 as uuid} from "uuid";

export class UserService {

    static async register(request: CreateUserRequest): Promise<void> {
        const registerRequest = Validation.validate(UserValidation.REGISTER, request);

        const totalUserWithSameEmail = await prismaClient.user.count({
            where: {
                email: registerRequest.email
            }
        })

        if (totalUserWithSameEmail != 0) {
            throw new ResponseError(400, "Email already registered");
        }

        registerRequest.password = await bcrypt.hash(registerRequest.password, 10);

        await prismaClient.user.create({
            data: {
                id: uuid(),
                email: registerRequest.email,
                password: registerRequest.password,
                name: registerRequest.name,
                address: registerRequest.address,
                phone: registerRequest.phone
            }
        });
    }

}
