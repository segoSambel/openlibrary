import {Publisher} from "@prisma/client";

export type PublisherResponse = {
    id: string;
    name: string;
    location: string;
    createdAt: string;
    updatedAt: string;
};

export type CreatePublisherRequest = {
    name: string;
    location: string;
}

export function toPublisherResponse(data: Publisher): PublisherResponse {
    return {
        id: data.id,
        name: data.name,
        location: data.location,
        createdAt: data.createdAt.toISOString(),
        updatedAt: data.updatedAt.toISOString()
    }
}
