import type { Application } from "express";
import chalk from "chalk";
import cookieParser from "cookie-parser";
import cors from "cors";
import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import { NotFoundException } from "./global-handler/httpexception";
import routes from "./routes/index";
import { globalErrorHandler } from "./global-handler/global-errorhandler";
import { whitelist } from "./utils/utility";


export default class App {
  public app: Application;
  private readonly PORT: number;

  constructor(port: number) {
    this.PORT = port;
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
    this.initErrorHandling();
  }

  private initMiddlewares(): void {
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true }));
    this.app.use(
      morgan((tokens, req, res) => {
        const status = Number(tokens.status(req, res));

        const color =
          status >= 500
            ? chalk.red
            : status >= 400
            ? chalk.yellow
            : status >= 300
            ? chalk.cyan
            : chalk.green;

        return [
          chalk.gray(tokens.method(req, res)),
          chalk.blue(tokens.url(req, res)),
          color(tokens.status(req, res)),
          chalk.magenta(`${tokens["response-time"](req, res)} ms`),
        ].join(" ");
      })
    );
    this.app.use(
      cors({
        origin: (origin, callback) => {
          // Allow requests with no origin (e.g., mobile apps, server-to-server)
          if (!origin || whitelist.includes(origin)) {
            callback(null, true);
          } else {
            callback(new Error("Not allowed by CORS"));
          }
        },
        credentials: true,
      })
    );
    this.app.use(helmet());
    this.app.use(cookieParser());
  }

  private initRoutes(): void {
    routes.forEach(({ path, controller, middleware }) => {
      if (middleware?.length) {
        this.app.use(path, ...middleware, controller);
      } else {
        this.app.use(path, controller);
      }
    });
  }

  private initErrorHandling(): void {
    this.app.use((req, _res, next) => {
      next(new NotFoundException(`Route ${req.originalUrl} not found`));
    });
     this.app.use(globalErrorHandler);
  }

  public initServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}
