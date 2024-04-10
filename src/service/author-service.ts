import {AuthorResponse, CreateAuthorRequest, toAuthorResponse} from "../model/author-model";
import {Validation} from "../validation/validation";
import {AuthorValidation} from "../validation/author-validation";
import {prismaClient} from "../application/database";
import {v4 as uuid} from "uuid";
import {ResponseError} from "../error/response-error";

export class AuthorService {

    static async create(request: CreateAuthorRequest): Promise<void> {
        const createRequest = Validation.validate(AuthorValidation.CREATE, request);

        await prismaClient.author.create({
            data: {
                id: uuid(),
                name: createRequest.name
            }
        })
    }

    static async get(authorId: string): Promise<AuthorResponse> {
        const author = await prismaClient.author.findUnique({
            where: {
                id: authorId
            }
        });

        if (!author) {
            throw new ResponseError(404, "Cannot find author");
        }

        return toAuthorResponse(author);
    }

}
