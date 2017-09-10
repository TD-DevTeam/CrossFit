/**
 * Exercise schema
 */

import * as mongoose from "mongoose";
import ModelGenerator from "./model";

export default class ExerciseModelGenerator implements ModelGenerator {
  private static _instance: ExerciseModelGenerator;

  public static get Instance(): ExerciseModelGenerator {
    if (this._instance == undefined) {
      this._instance = new this();
    }

    return this._instance;
  }

  readonly schema = new mongoose.Schema({
    name: { type: String, unique: true },
  }, {
    timestamps: true
  });

  model: mongoose.Model<ExerciseDocument>;

  constructor() {
    this.model = mongoose.model("Exercise", this.schema);
  }
}

export type ExerciseDocument = mongoose.Document & {
  name: string,
};
