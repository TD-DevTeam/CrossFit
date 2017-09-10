import { Application } from "express";
import HomeController from "./controllers/home";
import LoginController from "./controllers/login";
import ExerciseController from "./controllers/exercise";


export class Router {
  private static _instance: Router;

  private constructor() {

  }

  public static get Instance(): Router {
    return this._instance == undefined ? this._instance = new this() : this._instance;
  }

  route(app: Application): Application {
    // app route
    const homeController = HomeController.Instance;
    const loginController = LoginController.Instance;
    const exerciseController = ExerciseController.Instance;

    app.get("/", homeController.get);
    app.get("/login", loginController.get);
    app.post("/login", loginController.post);
    app.get("/exercise", exerciseController.get);
    app.post("/exercise", exerciseController.post);

    return app;
  }
}
