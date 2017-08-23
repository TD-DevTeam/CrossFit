/**
 * Module dependencies.
 */

import * as express from "express";
import * as path from "path";

const app = express();

app.set("port", 4000);
app.listen(app.get("port"), () => {
  console.log(("  app running at http://localhost:%d in %s mode"), app.get("port"), app.get("env"));
});
