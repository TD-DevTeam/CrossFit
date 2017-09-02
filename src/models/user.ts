import * as mongoose from "mongoose";
import ModelGenerator from "./model";

export default class UserModelGenerator implements ModelGenerator {
  readonly schema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
  }, { timestamps: true });

  model: mongoose.Model<mongoose.Document>;

  constructor() {
    // TODO : Password Hashing with schemas
    console.log("User Model Init");

    this.schema.methods.comparePassword = function (candidatePassword: string,
      cb: (err: Error, isMatch: boolean) => any) {
      if (candidatePassword === this.password) {
        cb(undefined, true);
      } else {
        cb(undefined, false);
      }
    };

    this.model = mongoose.model("User", this.schema);
  }
}


export type UserModel = mongoose.Document & {
  email: string,
  password: string,
  comparePassword: (candidatePassword: string, cb: (err: Error, isMatch: boolean) => any) => any
};
