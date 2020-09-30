
import {Document, Model, Schema} from "mongoose";
import {mongoose} from "../config/database.connection";

export interface IUser {
    _id: any;
    name: string;
    role: string;
    email: string;
    password: string;
    avatar: string;
    gameAdminInfo: string;
    country: string;
    city: string;
}

export interface IUserModel extends IUser, Document {
}

export let UserSchema: Schema = new Schema({
    name: {
        type: String
    },
    email: {
        type: String
    },
    role: {
        type: String,
        enum: ['ADMIN', 'USER', 'GAME ADMIN']
    },
    password: {
        type: String
    },
    avatar: {
        type: String
    },
    gameAdminInfo: {
        type: String
    },
    country: {
        type: String
    },
    city: {
        type: String
    }
});

export const User: Model<IUserModel> = mongoose.model("User", UserSchema);
