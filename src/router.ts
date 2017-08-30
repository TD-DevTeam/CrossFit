import { Application } from "express";
import HomeController from "./controllers/home";

export class Router {
  private static _instance: Router;

  private constructor() {

  }

  public static get Instance(): Router {
    return this._instance == undefined ? this._instance = new this() : this._instance;
  }

  route(app: Application): Application {
    // app route
    const homeController = new HomeController();

    app.get("/", homeController.get);
    return app;
  }
}
