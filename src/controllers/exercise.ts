import { Request, Response, NextFunction } from "express";
import * as validator from "express-validator";
import * as mongoose from "mongoose";

import Controller from "./controller";
import { ExerciseDocument } from "../models/exercise";
import ExerciseModelGenerator from "../models/exercise";

export default class ExerciseController extends Controller {
  private static _instance: ExerciseController;

  private constructor() {
    super();
  }

  public static get Instance(): ExerciseController {
    if (this._instance == undefined) {
      this._instance = new this();
    }

    return this._instance;
  }

  /**
   * GET exercise/
   */
  public get(req: Request, res: Response): void {
    res.render("exercise", {
      title: "Crossfit! Exercise"
    });
  }

  /**
   * POST exercise/
   */
  public post(req: Request, res: Response, next: NextFunction): void {
    console.log("exercise post sent");
    req.check("name", "Name cannot be blank").notEmpty();

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
      }
      // TODO : String parsing for non-array (ex Dictionary)
      console.log("message : " + msg);
      req.flash("errors", msg);
      return res.redirect("/exercise");
    }

    const ExerciseModel: mongoose.Model<ExerciseDocument> = ExerciseModelGenerator.Instance.model;
    const exerciseDocument: ExerciseDocument = new ExerciseModel({
      name: req.body.name
    });

    ExerciseModel.findOne({ name: req.body.name },
                          (err: Error, existingExercise: ExerciseDocument) => {
      if (err) { return next(err); }
      if (existingExercise) {
        req.flash("errors", "Exercise already exists." );
        return res.redirect("/exercise");
      }
      exerciseDocument.save((err) => {
        if (err) { return next(err); }
        req.flash("success", "Exercise is saved successfully.");
        return res.redirect("/exercise");
      });
    });
  }
}
