import { Application } from "express";
import HomeController from "./controllers/home";
import LoginController from "./controllers/login";
import LogoutController from "./controllers/logout";
import ExerciseController from "./controllers/exercise";
import SignupController from "./controllers/signup";

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
    const logoutController = LogoutController.Instance;
    const exerciseController = ExerciseController.Instance;
    const signupController = SignupController.Instance;

    app.get("/", homeController.get);
    app.get("/login", loginController.get);
    app.post("/login", loginController.post);
    app.get("/logout", logoutController.get);
    app.get("/signup", signupController.get);
    app.post("/signup", signupController.post);
    app.get("/exercise", exerciseController.get);
    app.post("/exercise", exerciseController.post);

    return app;
  }
}
