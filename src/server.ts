/**
 * Module dependencies.
 */

import * as express from "express";
import * as dotenv from "dotenv";
import * as path from "path";

const app = express();

dotenv.config({ path: ".env.crossfit" });

app.set("port", process.env.PORT);
app.listen(app.get("port"), () => {
  console.log(("  app running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
});

module.exports = app;
