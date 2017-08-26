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

dotenv.config({ path: ".env.crossfit" });

const MongoStore = mongo(session);
const app = express();

mongoose.connect(process.env.MONGODB_URI);

mongoose.connection.on("error", () => {
  console.log("MongoDB connection error. Is MongoDB running?");
  process.exit();
});

app.set("port", process.env.PORT);
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
// listening on port
app.listen(app.get("port"), () => {
  console.log(("  app running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
});

module.exports = app;
