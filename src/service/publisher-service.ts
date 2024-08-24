import {CreatePublisherRequest, PublisherResponse, toPublisherResponse} from "../model/publisher-model";
import {prismaClient} from "../application/database";
import {v4 as uuid} from "uuid";
import {Validation} from "../validation/validation";
import {PublisherValidation} from "../validation/publisher-validation";
import {ResponseError} from "../error/response-error";

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

    static async get(publisherId: string): Promise<PublisherResponse> {
        const publisher = await prismaClient.publisher.findUnique({
            where: {
                id: publisherId
            }
        });

        if (!publisher) {
            throw new ResponseError(404, "Cannot find publisher");
        }

        return toPublisherResponse(publisher);
    }
}
