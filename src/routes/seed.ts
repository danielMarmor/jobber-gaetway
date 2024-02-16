import { Seed } from "@gateway/controllers/auth/seed";
import { Health } from "@gateway/controllers/health";
import express, { Router } from "express";

class SeedRoutes {
    private router: Router;
    constructor() {
        this.router = express.Router();
    }

    public routes(): Router {
        this.router.put('/seed/:count', Seed.prototype.create);
        return this.router;
    }
}

export const seedRoutes: SeedRoutes = new SeedRoutes();