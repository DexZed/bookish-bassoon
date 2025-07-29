import express from "express";
import cors from "cors";
import chalk from "chalk";
import morgan from "morgan";
import dotenv from 'dotenv';
import { Application } from "express";
import helmet from "helmet";
import routes from "./routes";
dotenv.config();

export default class App {
  public app: Application;
  private readonly PORT: number;

  constructor(port: number) {
    this.PORT = port;
    this.app = express();
    this.initMiddlewares();
    this.initRoutes();
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
          chalk.magenta(tokens["response-time"](req, res) + " ms"),
        ].join(" ");
      })
    );
    this.app.use(cors());
    this.app.use(helmet());
  }
  private initRoutes(): void {
   routes.forEach(({path,controller})=>{
    this.app.use(path,controller);
   })
  }
  public initServer(): void {
    this.app.listen(this.PORT, () => {
      console.log(`Server is running on port ${this.PORT}`);
    });
  }
}
