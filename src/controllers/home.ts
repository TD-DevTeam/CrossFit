import { Request, Response } from "express";

/**
 * GET /
 */
export function index(req: Request, res: Response): void {
  res.render("home", {
    title: "Crossfit!"
  });
}
