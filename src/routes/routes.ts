import { Application } from "express";
import { healthRoutes } from "./health";

export const appRoutes = (app: Application) => {
    app.use('', healthRoutes.routes());
}