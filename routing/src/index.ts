import express, { type Request, type Response } from "express"

const app = express();

app.get("/", (_:Request, res:Response) => {
  res.send("Hello World!");
});

app.get('/:name', (req: Request, res: Response) => {
  
    res.send("Letters: " + req.params.name);
});

app.get('/:id', (req: Request, res: Response) => {
  res.send("Numbers: " + req.params.id);
});

app.listen(3000, () => {
  console.log("Example app listening on port 3000");
});