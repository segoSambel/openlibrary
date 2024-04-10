import {Author} from "@prisma/client";

export type AuthorResponse = {
    id: string,
    name: string,
    created_at: string;
    updated_at: string;
}

export type CreateAuthorRequest = {
    name: string
}

export type UpdateAuthorRequest = {
    id: string,
    name: string
}

export function toAuthorResponse(author: Author): AuthorResponse {
    return {
        id: author.id,
        name: author.name,
        created_at: author.createdAt.toISOString(),
        updated_at: author.updatedAt.toISOString()
    }
}
