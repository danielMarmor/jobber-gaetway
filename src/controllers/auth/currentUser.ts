import { authService } from "@gateway/services/api/auth.service";
import { AxiosResponse, HttpStatusCode } from "axios";
import { Request, Response } from "express";

export class CurrentUser {
    async read(req: Request, res: Response) {
        const response: AxiosResponse = await authService.getCurrentUser();
        res.status(HttpStatusCode.Ok).json({ message: response.data.message, user: response.data.user })
    }
    async resendEmail(req: Request, res: Response) {
        const response: AxiosResponse = await authService.resendEmail(req.body);
        res.status(HttpStatusCode.Created).json({ message: response.data.message, user: response.data.user })
    }
}