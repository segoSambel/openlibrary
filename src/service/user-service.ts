import {
    CreateUserRequest,
    LoginUserRequest,
    toUserResponse,
    UpdateUserRequest,
    UserResponse
} from "../model/user-model";
import {UserValidation} from "../validation/user-validation";
import {ResponseError} from "../error/response-error";
import {prismaClient} from "../application/database";
import {Validation} from "../validation/validation";
import {JwtUtil} from "../util/jwt-util";
import {User} from "@prisma/client";
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

    static async get(user: User): Promise<UserResponse> {
        return toUserResponse(user);
    }

    static async update(user: User, request: UpdateUserRequest): Promise<UserResponse> {
        const updateRequest = Validation.validate(UserValidation.UPDATE, request);

        if (updateRequest.name) {
            user.name = updateRequest.name;
        }

        if (updateRequest.password) {
            user.password = await bcrypt.hash(updateRequest.password, 10);
        }

        if (updateRequest.address) {
            user.address = updateRequest.address;
        }

        if (updateRequest.phone) {
            user.phone = updateRequest.phone;
        }

        const result = await prismaClient.user.update({
            where: {
                email: user.email
            },
            data: user
        });

        return toUserResponse(result);
    }
}
