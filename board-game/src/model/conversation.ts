import {Document, Model, Schema} from "mongoose";
import {mongoose} from "../config/database.connection";
import {IUser} from "./user";

export interface IConversation {
    _id: any;
    users: string[];
    name: string | null;
    image: string | null;
    lastMessageDate: Date | null;
    lastMessage: string | null;
    unreadCount: number;

}
export interface IConversationModel extends IConversation, Document {}

export let ConversationSchema: Schema = new Schema({
    users: {
        type: [String],
        required: true
    },
    // name: {
    //     type: String
    // },
    // image: {
    //     type: String
    // },
    unreadCount: {
        type: Object,
        required: true
    },
    lastMessageDate: {
        type: Number,
    },
    lastMessage: {
        type: String
    }
});

export const Conversation: Model<IConversationModel> = mongoose.model("conversations", ConversationSchema);
