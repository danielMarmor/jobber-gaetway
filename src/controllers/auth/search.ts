import { authService } from "@gateway/services/api/auth.service";
import { AxiosResponse, HttpStatusCode } from "axios";
import { Request, Response } from "express";

export class Search {
    async gigById(req: Request, res: Response): Promise<void> {
        const response: AxiosResponse = await authService.getGig(req.params.gigId);
        res.status(HttpStatusCode.Ok).json({ message: response.data.message, gig: response.data.gig })
    }
    async gigs(req: Request, res: Response): Promise<void> {
        const { from, size, type } = req.params;

        console.log(`req query: ${req.query}`);
        let query = "";
        const keyValues = Object.entries(req.query);
        const lastQueryIndex = keyValues.length - 1;
        keyValues.forEach(([key, value], index) => {
            query += `${key}=${value}${index !== lastQueryIndex ? "&" : ""}`;
        });
        
        console.log(`query: ${query}`);
        const response: AxiosResponse = await authService.getGigs(query, from, size, type);
        res.status(HttpStatusCode.Ok).json({ message: response.data.message, total: response.data.total, gigs: response.data.gigs })
    }
}