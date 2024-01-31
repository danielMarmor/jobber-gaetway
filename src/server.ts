import { CustomError, IErrorResponse, winstonLogger } from "@danielmarmor/jobber-shared";
import { Logger, error } from "winston";
import { Application, Request, Response, NextFunction, json, urlencoded } from 'express'
import cookieSession from 'cookie-session'
import hpp from "hpp";
import helmet from "helmet";
import cors from "cors";
import compression from "compression";
import { HttpStatusCode } from "axios";
import http from 'http'
import { config } from "@gateway/config";
import { elasticSearch } from "./elasticSearch";
import { appRoutes } from "./routes/routes";

const SERVER_PORT = 4000;

const logger: Logger = winstonLogger(config.ELASTIC_SEARCH_URL!, "gateway server", "debug");

export class GatewayServer {
    private app: Application
    constructor(app: Application) {
        this.app = app;
    }

    public start(): void {
        //MIDDELWEARS
        this.securityMiddlewear(this.app);
        this.standartMiddlewear(this.app);
        this.routesMiddlewear(this.app);
        this.startElasticSearch();
        this.errorHandler(this.app);
        //LISTEN
        this.startServer(this.app);

    }

    private securityMiddlewear(app: Application) {
        app.set('trust proxy', 1);
        app.use(
            cookieSession({
                name: 'jobber-session',
                keys: [config.SECRET_KEY_ONE!, config.SECRET_KEY_TWO!],
                maxAge: 24 * 7 * 3600000,
                secure: config.NODE_ENV !== "developement"
                //sameSite : 'none'
            })
        );
        app.use(hpp());
        app.use(helmet());
        app.use(cors({
            origin: config.CLIENT_URL,
            credentials: true,
            methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS']
        }));

    }

    private standartMiddlewear(app: Application) {
        app.use(compression());
        app.use(json({ limit: '200mb' }));
        app.use(urlencoded({ extended: true, limit: '200mb' }));
    }

    private routesMiddlewear(app: Application) {
        appRoutes(app);
    }

    private startElasticSearch(): void {
       // elasticSearch.CheckConnction();
    }

    private errorHandler(app: Application): void {
        app.use("*", (req: Request, res: Response, next: NextFunction) => {
            const fullUrl = `${req.protocol}:/${req.get('host')}/${req.originalUrl}`;
            logger.log('error', `${fullUrl} address does not exists`);
            res.status(HttpStatusCode.NotFound).json({
                message: "The endpoint called does not exists!"
            });
            next();
        });
        app.use((error: IErrorResponse, req: Request, res: Response, next: NextFunction) => {
            logger.log('error', `gatewy service error coming from ${error.comingFrom}`, error);
            if (error instanceof CustomError) {
                res.status(error.statusCode).json(error.serializeError())
            }
            next();
        })
    }

    private async startServer(app: Application): Promise<void> {
        const server: http.Server = new http.Server(app);
        await this.startHttpServer(server);
    }

    private async startHttpServer(httpServer: http.Server): Promise<void> {
        try {
            logger.info(`gateway server has started with process id ${process.pid}`);
            httpServer.listen(SERVER_PORT, () => {
                logger.info(`gateway server is listening on port ${SERVER_PORT}`)
            });
        }
        catch (error) {
            logger.log('error', 'gateway service startHttpServer() method', error);
        }
    }
}