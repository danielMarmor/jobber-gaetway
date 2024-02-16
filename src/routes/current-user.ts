import { CurrentUser } from "@gateway/controllers/auth/currentUser";
import { Refresh } from "@gateway/controllers/auth/refreshToken";
import { authMiddleware } from "@gateway/services/authMiddleware";
import express, { Router } from "express";

class CurrenUserRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }
    public routes(): Router {
        this.router.get('/current-user', authMiddleware.checkAuthentication, CurrentUser.prototype.read);
        this.router.post('/resend-email', authMiddleware.checkAuthentication, CurrentUser.prototype.resendEmail);
        this.router.get('/refresh-token', authMiddleware.checkAuthentication, Refresh.prototype.token);
        return this.router;
    }
}

export const currentUserRoutes: CurrenUserRoutes = new CurrenUserRoutes();