import { Application } from "express";
import HomeController from "./controllers/home";

export default class Router {
  route(app: Application): Application {
    // app route
    const homeController = new HomeController();

    app.get("/", homeController.index);
    return app;
  }
}
