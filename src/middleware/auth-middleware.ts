import {NextFunction, Response} from 'express';
import {JwtUtil} from "../util/jwt-util";
import {prismaClient} from "../application/database";
import {UserRequest} from "../type/user-request";
import winston from "winston";

export const authMiddleware = async (req: UserRequest, res: Response, next: NextFunction) => {
    const token = req.get('Authorization')?.startsWith('Bearer ') ? req.get('Authorization')?.substring(7) : null;

    if (token) {
        try {
            const decoded = await JwtUtil.verify(token);

            const user = await prismaClient.user.findUnique({
                where: {
                    email: decoded.email as string
                }
            });

            if (user) {
                req.user = user;
                return next();
            }
        } catch (e) {
            return next(e);
        }
    }

    res.status(401).json({message: 'Unauthorized'}).end();
}
