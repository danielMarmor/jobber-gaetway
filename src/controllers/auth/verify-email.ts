import { authService } from "@gateway/services/api/auth.service";
import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { HttpStatusCode } from "axios";

export class VerifyEmail {
    async update(req: Request, res: Response) {
        const response: AxiosResponse = await authService.verifyEmail(req.body.token);
        res.status(HttpStatusCode.Ok).json({ message: response.data.message, user: response.data.user });
    }
}

