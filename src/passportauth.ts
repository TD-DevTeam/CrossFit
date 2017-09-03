import * as mongoose from "mongoose";
import * as passport from "passport";
import { Strategy as LocalStrategy } from "passport-local";
import { Request, Response, NextFunction } from "express";
import UserModelGenerator from "./models/user";
import { UserDocument } from "./models/user";

const userModel: mongoose.Model<UserDocument> = new UserModelGenerator().model;

export class PassportAuth {
  private static _instance: PassportAuth;

  private constructor() {

  }

  public static get Instance(): PassportAuth {
    return this._instance == undefined ? this._instance = new this() : this._instance;
  }

  setup(passport: passport.Passport): passport.Passport {
    passport.serializeUser<any, any>((user, done) => {
      done(undefined, user.id);
    });

    passport.deserializeUser((id, done) => {
      userModel.findById(id, (err, user) => {
      done(err, user);
      });
    });

    passport.use(new LocalStrategy({ usernameField: "email"}, (email, password, done) => {
        userModel.findOne({ email: email.toLowerCase() }, (err: Error, user: UserDocument) => {
          if (err) { return done(err); }
          if (!user) { return done(undefined, false, { message: `${email} not found.`}); }
          user.comparePassword(password, (err: Error, isMatch: boolean) => {
            if (err) { return done(err); }
            if (isMatch) { return done(undefined, user); }
            return done(undefined, false, { message: "Invalid email or password"});
          });
        });
      })
    );        // TODO : String management policy

    return passport;
  }
}
