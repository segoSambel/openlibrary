import {User} from "@prisma/client";

export type UserResponse = {
    id: string;
    email: string;
    name: string;
    address: string;
    phone: string;
    created_at: string;
    updated_at: string;
};

export type CreateUserRequest = {
    email: string;
    password: string;
    name: string;
    address: string;
    phone: string;
};

export function toUserResponse(data: User): UserResponse {
    return {
        id: data.id,
        email: data.email,
        name: data.name,
        address: data.address,
        phone: data.phone,
        created_at: data.createdAt.toString(),
        updated_at: data.updatedAt.toString(),
    };
}
