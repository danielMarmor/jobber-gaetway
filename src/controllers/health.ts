
import { Request, Response, } from "express";
import { HttpStatusCode } from "axios";

export class Health {
    public health(_req: Request, res: Response): void {
        res.status(HttpStatusCode.Ok).send('Api gateway service is healthy and OK');
    }
}