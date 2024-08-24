import {Request, Response, NextFunction} from "express";
import {CreatePublisherRequest} from "../model/publisher-model";
import {PublisherService} from "../service/publisher-service";

export class PublisherController {
    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreatePublisherRequest = req.body as CreatePublisherRequest;
            await PublisherService.create(request)

            res.status(200).json({
                message: "Publisher added successfully"
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const publisherId = req.params.id;
            const response = await PublisherService.get(publisherId);

            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e)
        }
    }
}
