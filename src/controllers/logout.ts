import { Request, Response, NextFunction } from "express";
import Controller from "./controller";
import * as passport from "passport";

export default class LogoutController extends Controller {
  private static _instance: LogoutController;

  private constructor() {
    super();
  }

  public static get Instance(): LogoutController {
    if (this._instance == undefined) {
      this._instance = new this();
    }

    return this._instance;
  }

  /**
   * GET logout/
   */
  public get(req: Request, res: Response): void {
    req.logout();
    res.render("logout", {
      title: "Crossfit! Logout"
    });
  }
}
