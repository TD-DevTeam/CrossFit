import { Request, Response } from "express";
export default abstract class Controller {
  Controller: Controller = this;

  abstract get(req: Request, res: Response): void;
}
