import { NextFunction, Request, Response } from "express";
import { auth } from "express-oauth2-jwt-bearer";
import jwt from "jsonwebtoken"
import User from "../models/user";
export const jwtCheck = auth({
    audience: process.env.AUTH0_AUDIENCE,
    issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
    tokenSigningAlg: process.env.AUTH0_TOKEN_SIGNNING_ALG,
});

declare global {
    namespace Express {
        interface Request {
            userId: string;
            auth0Id: string;
        }
    }
}

export const jwtParse = async (req: Request, res: Response, next: NextFunction) => {
    const { authorization } = req.headers;

    // Bearer fslkjffjfljfjf;jdflkjdfs
    if (!authorization || !authorization.startsWith("Bearer ")) {
        return res.sendStatus(401);
    }

    const token = authorization.split(" ")[1];

    try {
        const decoded = jwt.decode(token) as jwt.JwtPayload;
        const auth0id = decoded.sub;

        const user = await User.findOne({ auth0id });

        if (!user) {
            return res.sendStatus(401);
        }

        req.auth0Id = auth0id as string;
        req.userId = user._id.toString();
        next();

    } catch (error) {
        console.error(error);
        return res.sendStatus(401);
    }


};