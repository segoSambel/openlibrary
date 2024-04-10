import {NextFunction, Request, Response} from 'express';
import {CreateAuthorRequest} from "../model/author-model";
import {AuthorService} from "../service/author-service";

export class AuthorController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateAuthorRequest = req.body as CreateAuthorRequest;
            await AuthorService.create(request);

            res.status(200).json({
                message: "Author added successfully"
            });
        } catch (e) {
            next(e)
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const authorId = req.params.id
            const response = await AuthorService.get(authorId);

            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e)
        }
    }

}
