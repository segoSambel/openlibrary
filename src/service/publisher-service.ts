import {
    CreatePublisherRequest,
    PublisherResponse,
    toPublisherResponse,
    UpdatePublisherRequest
} from "../model/publisher-model";
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

    static async update(request: UpdatePublisherRequest): Promise<PublisherResponse> {
        const updateRequest = Validation.validate(PublisherValidation.UPDATE, request);

        const publisher = await prismaClient.publisher.findUnique({
            where: {
                id: updateRequest.id
            }
        });

        if (!publisher) {
            throw new ResponseError(404, "Cannot find publisher");
        }

        if (updateRequest.name) {
            publisher.name = updateRequest.name
        }

        if (updateRequest.location) {
            publisher.location = updateRequest.location
        }

        const response = await prismaClient.publisher.update({
            where: {
                id: publisher.id
            },
            data: publisher
        });

        return toPublisherResponse(response);
    }
}
