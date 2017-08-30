import { Application } from "express";
import HomeController from "./controllers/home";
import LoginController from "./controllers/login";

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
    const loginController = new LoginController();

    app.get("/", homeController.get);
    app.get("/login/", loginController.get);

    return app;
  }
}
