import * as jose from 'jose';
import {JWTPayload} from "jose";

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
}
