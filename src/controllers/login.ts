import { Request, Response } from "express";
import Controller from "./controller";
// Default classes & interfaces are to be loaded without {}.

export default class LoginController extends Controller {
  /**
   * GET login/
   */
  public get(req: Request, res: Response): void {
    res.render("login", {
      title: "Crossfit! Login"
    });
  }
}
