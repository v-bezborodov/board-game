import {Document, Model, Schema} from "mongoose";
import {mongoose} from "../config/database.connection";

export interface IMessage {
    _id: any;
    authorId: any;
    text: string;
    date: Date;
    isRead: boolean;
    conversationId: any;
}


export interface IMessageModel extends IMessage, Document {
}

export let MessageSchema: Schema = new Schema({
    authorId: {
        type: String,
        required: true
    },
    text: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        required: true
    },
    isRead: {
        type: Boolean,
        required: true
    },
    conversationId: {
        type: String,
        required: true
    }
});

export const Message: Model<IMessageModel> = mongoose.model("messages", MessageSchema);
