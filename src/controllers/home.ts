import { Request, Response } from "express";
import Controller from "./controller";
// Default classes & interfaces are to be loaded without {}.

export default class HomeController implements Controller {
  /**
   * GET /
   */
  public index(req: Request, res: Response): void {
    res.render("home", {
      title: "Crossfit!"
    });
  }
}
