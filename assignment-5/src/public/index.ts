import { Request, Response, Router } from "express";

class IndexRoute {
  public readonly router: Router;
  constructor() {
    this.router = Router();
    this.configureRoutes();
  }
  private configureRoutes(): void {
    this.router.get("/", (_: Request, res: Response) => {
      
      
      res.json({ message: "Hello World" });
    });
  }
}

export default new IndexRoute().router;
