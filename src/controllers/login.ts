import { Request, Response, NextFunction } from "express";
import * as Validator from "express-validator";
import Controller from "./controller";
import { UserModel } from "../models/user";
import * as passport from "passport";

export default class LoginController extends Controller {
  /**
   * GET login/
   */
  public get(req: Request, res: Response): void {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("login", {
      title: "Crossfit! Login"
    });
  }

  /**
   * POST login/
   */
  public post(req: Request, res: Response, next: NextFunction): void {
    console.log("login post sent");
    req.check("email", "Email is not valid").isEmail();
    req.check("password", "Password cannot be blank").isEmpty();
    req.sanitize("email").normalizeEmail({ gmail_remove_dots: false });

    console.log("Request : " + req.body);

    const errors = req.validationErrors;

    if (errors) {
      // TODO : flash lib(Error, Success)
      console.log("Error while post validation");
      req.flash("errors", errors.toString());
      return res.redirect("/login");
    }

    passport.authenticate("local", (err: Error, user: UserModel, info: any) => {
      if (err) { return next(err); }
      if (!user) {
        console.log("Error while authentication");
        req.flash("errors", info.message);
        return res.redirect("/login");
      }
      req.logIn(user, (err) => {
        if (err) {
          console.log("Error while login");
          return next(err);
        }
        console.log("Login Success");
        req.flash("success", "Success! You are logged in." );
        res.redirect(req.session.returnTo || "/");
      });
    })(req, res, next);
  }
}
