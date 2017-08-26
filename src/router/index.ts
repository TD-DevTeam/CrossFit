import { Application, Request, Response } from "express";

export const route = (app: Application,
                      index: (req: Request, res: Response) => void) => {
  // app route
  app.get("/", index);
};
