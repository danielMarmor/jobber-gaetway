import { Application } from "express";
import { healthRoutes } from "@gateway/routes/health";
import { authRoutes } from "@gateway/routes/auth";
import { currentUserRoutes } from "./current-user";
import { authMiddleware } from "@gateway/services/authMiddleware";
import { searchRoutes } from "./search";
import { seedRoutes } from "./seed";

const BASE_PATH = "/api/gateway/v1/auth";

export const appRoutes = (app: Application) => {
    app.use('', healthRoutes.routes());
    app.use(BASE_PATH, authRoutes.routes());
    app.use(BASE_PATH, authMiddleware.verify, currentUserRoutes.routes());
    app.use(BASE_PATH, searchRoutes.routes());
    app.use(BASE_PATH, seedRoutes.routes());
}