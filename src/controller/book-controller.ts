import {Request, Response, NextFunction} from "express";
import {CreateBookRequest} from "../model/book-model";
import {BookService} from "../service/book-service";

export class BookController {

    static async create(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateBookRequest = req.body as CreateBookRequest
            const response = await BookService.create(request);

            res.status(200).json({
                message: "Publisher added successfully",
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

    static async get(req: Request, res: Response, next: NextFunction) {
        try {
            const bookId = req.params.id;
            const response = await BookService.get(bookId);

            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }
}
