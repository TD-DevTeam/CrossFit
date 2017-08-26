import { Application } from "express";
import * as homeController from "./controllers/home";

export function route(app: Application): void {
  // app route
  app.get("/", homeController.index);
}
