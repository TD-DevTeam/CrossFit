import { Application } from "express";
import HomeController from "./controllers/home";

export class Router {
  private static _instance: Router;

  private constructor() {

  }

  public static get Instance(): Router {
    if (this._instance == undefined) {
      this._instance = new this();
    }
    return this._instance;
  }

  route(app: Application): Application {
    // app route
    const homeController = new HomeController();

    app.get("/", homeController.index);
    return app;
  }
}
