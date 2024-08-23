import {CreatePublisherRequest} from "../model/publisher-model";
import {prismaClient} from "../application/database";
import {v4 as uuid} from "uuid";
import {Validation} from "../validation/validation";
import {PublisherValidation} from "../validation/publisher-validation";

export class PublisherService {

    static async create(data: CreatePublisherRequest) {
        const createRequest = Validation.validate(PublisherValidation.CREATE, data);

        await prismaClient.publisher.create({
            data: {
                id: uuid(),
                name: createRequest.name,
                location: createRequest.location
            }
        });
    }

}
