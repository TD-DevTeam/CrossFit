import { Request, Response, NextFunction } from "express";
import * as mongoose from "mongoose";
import * as validator from "express-validator";
import Controller from "./controller";
import UserModelGenerator from "../models/user";
import { UserDocument } from "../models/user";

const userModel: mongoose.Model<UserDocument> = UserModelGenerator.Instance.model;

export default class SignupController extends Controller {
  private static _instance: SignupController;

  private constructor() {
    super();
  }

  public static get Instance(): SignupController {
    if (this._instance == undefined) {
      this._instance = new this();
    }

    return this._instance;
  }

  /**
   * GET signup/
   */
  public get(req: Request, res: Response): void {
    if (req.user) {
      return res.redirect("/");
    }
    res.render("signup", {
      title: "Crossfit! Signup"
    });
  }

  /**
   * POST signup/
   */
   public post(req: Request, res: Response, next: NextFunction): void {
     console.log("post signup");
     req.check("email", "Email is not valid").isEmail();
     req.check("password", "Password cannot be blank").notEmpty();
     req.sanitize("email").normalizeEmail({ gmail_lowercase: true, gmail_remove_dots: false });

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
       }// TODO : String parsing for non-array (ex Dictionary)
       console.log("message : " + msg);
       req.flash("errors", msg);
       return res.redirect("/signup");
     }

     userModel.findOne({ email: req.body.email }, (err: Error, existingUser: UserDocument) => {
       if (err) { return next(err); }
       if (existingUser) {
         req.flash("errors", "Account already exists.");
         return res.redirect("/signup");
       }

       userModel.create({ email: req.body.email, password: req.body.password},
         (err: Error, newUser: UserDocument) => {
           if (err) { return next(err); }
           req.logIn(newUser, (err) => {
             if (err) {
               return next(err);
             }
             res.redirect("/");
           });
         }
       );
     });
   }
 }
