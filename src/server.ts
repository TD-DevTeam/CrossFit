/**
 * Module dependencies.
 */

import * as express from "express";
import * as dotenv from "dotenv";
import * as path from "path";
import * as session from "express-session";
import * as mongo from "connect-mongo";
import * as bodyParser from "body-parser";
import * as mongoose from "mongoose";
import * as pug from "pug";

import Router from "./router";
// path적을 필요 없이 자동 임포트 하도록 기여해도 좋을듯(자바처럼)

dotenv.config({ path: ".env.crossfit" });

const MongoStore: mongo.MongoStoreFactory = mongo(session);
const app: express.Application = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Is MongoDB running?");
  process.exit();
});

app.set("port", process.env.PORT);

// pug setup
app.set("views", path.join(__dirname, "../views"));
app.set("view engine", "pug");

// parsing body
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// session setup
app.use(session({
  resave: true,                         // depends on if store has touch method
  saveUninitialized: true,              // save uninitialized session
  secret: process.env.SESSION_SECRET,   // signs session ID cookie
  store: new MongoStore({               // store for session
    url: process.env.MONGODB_URI,
    autoReconnect: true                 // Reconnects to mongodb
  })
}));

// set route
new Router().route(app);

// listening on port
app.listen(app.get("port"), () => {
  console.log(("  app running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
});

module.exports = app;
