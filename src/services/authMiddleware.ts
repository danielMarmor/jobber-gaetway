import { IAuthPayload, NotAuthorizedError } from "@danielmarmor/jobber-shared";
import { config } from "@gateway/config";
import { NextFunction, Request, Response } from "express";
import { verify } from 'jsonwebtoken'

class AuthMiddleware {
    public verify(req: Request, res: Response, next: NextFunction) {
        if (!req.session?.jwt) {
            throw new NotAuthorizedError("auth token not supplied, please login", "api geteway verify() method")
        }
        try {
            const authPayload: IAuthPayload = verify(req.session?.jwt, config.JWT_TOKEN!) as IAuthPayload;
            req.currentUser = authPayload;
        } catch (error) {
            throw new NotAuthorizedError("auth token not valid, not authenticated", "api geteway verify() method")
        }
        next();

    }
    public checkAuthentication(req: Request, _res: Response, next: NextFunction) {
        if (!req.currentUser) {
            throw new NotAuthorizedError("authentication is required with auth token", "api geteway checkAuthentication() method")
        }
        next();
    }
}

export const authMiddleware: AuthMiddleware = new AuthMiddleware();