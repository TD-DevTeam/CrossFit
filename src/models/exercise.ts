/**
 * Exercise schema
 */

import * as mongoose from "mongoose";
import ModelGenerator from "./model";

export default class ExerciseModelGenerator implements ModelGenerator {
  readonly schema = new mongoose.Schema({
    name: { type: String, unique: true },
  }, {
    timestamps: true
  });

  model: mongoose.Model<ExerciseDocument>;

  constructor() {
    this.model = mongoose.model("Exercise", this.schmea);
  }
}

export type ExerciseDocument = mongoose.Document & {
  name: string,
}
