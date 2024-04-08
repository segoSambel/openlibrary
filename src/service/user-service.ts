import {CreateUserRequest, LoginUserRequest} from "../model/user-model";
import {Validation} from "../validation/validation";
import {UserValidation} from "../validation/user-validation";
import {prismaClient} from "../application/database";
import {ResponseError} from "../error/response-error";
import bcrypt from "bcrypt";
import * as jose from "jose";
import {v4 as uuid} from "uuid";
import {JwtUtil} from "../util/jwt-util";

export class UserService {

    constructor() {
        require('dotenv').config()
    }


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

    static async login(request: LoginUserRequest): Promise<string> {
        const loginRequest = Validation.validate(UserValidation.LOGIN, request);

        const user = await prismaClient.user.findUnique({
            where: {
                email: loginRequest.email
            }
        });

        if (!user) {
            throw new ResponseError(401, "Email or password is wrong")
        }

        const isPasswordValid = await bcrypt.compare(loginRequest.password, user.password)
        if (!isPasswordValid) {
            throw new ResponseError(401, "Email or password is wrong")
        }

        const payload = {
            email: user.email,
            name: user.name
        }

        return await JwtUtil.sign(payload);
    }

}
