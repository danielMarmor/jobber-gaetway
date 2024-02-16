import { authService } from "@gateway/services/api/auth.service";
import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { HttpStatusCode } from "axios";

export class SignIn {
    async read(req: Request, res: Response) {
        const response: AxiosResponse = await authService.signIn(req.body);
        req.session = { jwt: response.data.token };
        res.status(HttpStatusCode.Created).json({ message: response.data.message, user: response.data.user })

    }
}

