import * as jose from 'jose';
import {JWTPayload} from 'jose';
import {ResponseError} from "../error/response-error";

export class JwtUtil {

    constructor() {
        require('dotenv').config();
    }

    static async sign(payload: JWTPayload): Promise<string> {
        const alg = 'HS256';
        return await new jose.SignJWT(payload)
            .setProtectedHeader({alg})
            .setIssuedAt()
            .setIssuer(process.env.JWT_ISSUER!)
            .setAudience(process.env.JWT_AUDIENCE!)
            .setExpirationTime(process.env.JWT_EXPIRATION_TIME!)
            .sign(new TextEncoder().encode(process.env.JWT_SECRET));
    }

    static async verify(token: string): Promise<JWTPayload> {
        try {
            const {payload} = await jose.jwtVerify(token, new TextEncoder().encode(process.env.JWT_SECRET), {
                issuer: process.env.JWT_ISSUER,
                audience: process.env.JWT_AUDIENCE,
                algorithms: ['HS256']
            });

            return payload;
        } catch (error) {
            if (error instanceof jose.errors.JWSInvalid || error instanceof jose.errors.JWSInvalid) {
                throw new ResponseError(401, 'Unauthorized');
            } else {
                throw new ResponseError(500, 'Internal Server Error');
            }
        }
    }
}
