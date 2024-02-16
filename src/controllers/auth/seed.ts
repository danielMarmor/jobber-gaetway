import { authService } from "@gateway/services/api/auth.service";
import { AxiosResponse } from "axios";
import { Request, Response } from "express";
import { HttpStatusCode } from "axios";

export class Seed {
    async create(req: Request, res: Response) {
        const response: AxiosResponse = await authService.seed(req.params.count);
        req.session = { jwt: response.data.token };
        res.status(HttpStatusCode.Ok).json({ message: response.data.message })

    }
}

