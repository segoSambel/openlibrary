import {NextFunction, Request, Response} from 'express';
import {CreateUserRequest, LoginUserRequest} from "../model/user-model";
import {UserService} from "../service/user-service";
import {UserRequest} from "../type/user-request";

export class UserController {

    static async register(req: Request, res: Response, next: NextFunction) {
        try {
            const request: CreateUserRequest = req.body;
            await UserService.register(request);

            res.status(200).json({
                message: "User created successfully"
            })
        } catch (e) {
            next(e);
        }
    }

    static async login(req: Request, res: Response, next: NextFunction) {
        try {
            const request: LoginUserRequest = req.body;
            const response = await UserService.login(request);

            res.status(200).json({
                token: response
            })
        } catch (e) {
            next(e);
        }
    }

    static async get(req: UserRequest, res: Response, next: NextFunction) {
        try {
            const response = await UserService.get(req.user!);

            res.status(200).json({
                data: response
            });
        } catch (e) {
            next(e);
        }
    }

}
