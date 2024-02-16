import { authService } from "@gateway/services/api/auth.service";
import { AxiosResponse, HttpStatusCode } from "axios";
import { Request, Response } from "express";

export class Password {
    async forgotPassord(req: Request, res: Response) {
        const response: AxiosResponse = await authService.forgotPassword(req.body.email);
        res.status(HttpStatusCode.Ok).json({ message: response.data.message })
    }

    async resetPassword(req: Request, res: Response) {
        const { password, confirmPassword } = req.body;
        const response: AxiosResponse = await authService.resetPassword(req.params.token, password, confirmPassword);
        res.status(HttpStatusCode.Ok).json({ message: response.data.message })
    }

    async changePassword(req: Request, res: Response) {
        const { currentPassword, newPassword } = req.body;
        const response: AxiosResponse = await authService.changePassword(currentPassword, newPassword);
        res.status(HttpStatusCode.Ok).json({ message: response.data.message })
    }
}