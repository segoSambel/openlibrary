import {CreateAuthorRequest} from "../model/author-model";
import {Validation} from "../validation/validation";
import {AuthorValidation} from "../validation/author-validation";
import {prismaClient} from "../application/database";
import {v4 as uuid} from "uuid";

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

}
