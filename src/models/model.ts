import * as mongoose from "mongoose";

export default interface ModelGenerator {
  model: mongoose.Model<mongoose.Document>;
}
