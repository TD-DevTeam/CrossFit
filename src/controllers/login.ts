import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";
import Controller from "./controller";
import { UserDocument } from "../models/user";
import * as passport from "passport";

export default class LoginController extends Controller {
  private static _instance: LoginController;

  private constructor() {
    super();
  }

  public static get Instance(): LoginController {
    if (this._instance == undefined) {
      this._instance = new this();
    }

    return this._instance;
  }

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
    req.check("password", "Password cannot be blank").notEmpty();
    req.sanitize("email").normalizeEmail({ gmail_lowercase: true, gmail_remove_dots: false });

    console.log(req.body);

    const errors: any = req.validationErrors(false);
    // This uses un-imported type

    if (errors) {
      // TODO : flash lib(Error, Success)
      console.log("Error while post validation");
      let i: number = 0;
      let msg: string = "";
      if (errors instanceof Array) {
        for (; i < errors.length; i++) {
          msg += (<Array<any>>errors)[i].msg;
          if (i < errors.length - 1) {
            msg += ", ";
          }
        }
      }     // TODO : String parsing for non-array (ex Dictionary)
      console.log("message : " + msg);
      req.flash("errors", msg);
      return res.redirect("/login");
    }

    passport.authenticate("local", (err: Error, user: UserDocument, info: any) => {
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
