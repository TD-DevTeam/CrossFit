import * as mongoose from "mongoose";
import * as bcrypt from "bcrypt-nodejs";
import ModelGenerator from "./model";

export default class UserModelGenerator implements ModelGenerator {
  private static _instance: UserModelGenerator;

  public static get Instance(): UserModelGenerator {
    if (this._instance == undefined) {
      this._instance = new this();
    }

    return this._instance;
  }

  readonly schema = new mongoose.Schema({
    email: { type: String, unique: true },
    password: String
  }, { timestamps: true });

  model: mongoose.Model<UserDocument>;

  private constructor() {

    this.schema.pre("save", function (next: any) {
      const userDocument: UserDocument = this;
      bcrypt.genSalt(12, (err: Error, salt: string) => {
        if (err) { return next(err); }
        bcrypt.hash(userDocument.password, salt, undefined, (err: Error, hash: string) => {
          if (err) { return next(err); }
          userDocument.password = hash;     // hashed version of password is stored in DB
          next();
        });
      });
    });

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
