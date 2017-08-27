import { Request, Response } from "express";
import Controller from "./controller";

export default class HomeController extends Controller {
  private static _instance: HomeController;

  private constructor() {
    super();
  }

  public static get Instance(): HomeController {
    if (this._instance == undefined) {
      this._instance = new this();
    }

    return this._instance;
  }
  /**
   * GET /
   */
  public index(req: Request, res: Response): void {
    res.render("home", {
      title: "Crossfit!"
    });
  }
}
