import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt-nodejs";
import ModelGenerator from "./model";

export default class UserModelGenerator implements ModelGenerator {
  readonly schema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
  }, { timestamps: true });

  model: mongoose.Model<UserDocument>;

  constructor() {
    // TODO : Password Hashing with schemas

    this.schema.methods.comparePassword = function (candidatePassword: string,
      cb: (err: Error, isMatch: boolean) => any) { // Too Complex Return Type of cb.
        // Hashed version of candidatePassword is compared to stored password hash.
        bcrypt.compare(candidatePassword, this.password, (err: Error, isMatch: boolean) => {
          cb(err, isMatch);
        });
    };

    // Schema is used to create the model, which is Model for UserDocument.
    this.model = mongoose.model("User", this.schema);
  }
}

// UserDocument type for type inference of created Document from model.
export type UserDocument = mongoose.Document & {
  email: string,
  password: string,
  comparePassword: (candidatePassword: string, cb: (err: Error, isMatch: boolean) => any) => any
};
