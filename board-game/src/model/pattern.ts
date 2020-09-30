import {Model, Schema} from "mongoose";
import {mongoose} from "../config/database.connection";

export const Pattern: Model<any> = mongoose.model("Pattern", new Schema({userId: String, isPublish: Boolean}, {strict: false}));
