export type AuthorResponse = {
    id: string,
    name: string,
    created_at: string;
    updated_at: string;
}

export type CreateAuthorRequest = {
    name: string
}
