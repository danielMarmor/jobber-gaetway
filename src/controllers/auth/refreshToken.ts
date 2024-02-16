import { authService } from "@gateway/services/api/auth.service";
import { AxiosResponse, HttpStatusCode } from "axios";
import { Request, Response } from "express";

export class Refresh {
    async token(req: Request, res: Response) {
        const response: AxiosResponse = await authService.getRefreshToken(req.params.username);
        req.session = { jwt: response.data.token }
        res.status(HttpStatusCode.Ok).json({ message: response.data.message, user: response.data.user, token: response.data.token })
    }

}