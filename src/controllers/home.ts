import { Request, Response } from "express";
import Controller from "./controller";
// Default classes & interfaces are to be loaded without {}.

export default class HomeController extends Controller {
  /**
   * GET /
   */
  public get(req: Request, res: Response): void {
    res.render("home", {
      title: "Crossfit!"
    });
  }
}
