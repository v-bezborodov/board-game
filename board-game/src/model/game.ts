import {strict} from "assert";
import {Runtime} from "inspector";
import {Document, Model, Schema} from "mongoose";
import {mongoose} from "../config/database.connection";


export interface IGame {
    _id: any;
    name: string;
    patternId: string;
    patternName: string;
    userId: string;
    requests: string[];
    members: string[];
    status: string;
    meetingId: number;
    activeMembers: any[];
    decks: any[];

    date: Date;
    price: string;
    description: string;
    avatar: string;
}

export interface IGameModel extends IGame, Document {
}

export let GameSchema: Schema = new Schema({
    name: {
        type: String
    },
    patternId: {
        type: String
    },
    userId: {
        type: String
    },
    patternName: {
        type: String
    },
    date: {
        type: Date
    },
    requests: {
        type: Array
    },
    members: {
        type: Array
    },
    activeMembers: {
        type: Array
    },
    decks: {
        type: Array
    },
    status: {
        type: String
    },
    meetingId: {
        type: Number
    },
    price: {
        type: String
    },
    description: {
        type: String
    },
    avatar: {
        type: String
    }
});

export const Game: Model<IGameModel> = mongoose.model("Game", GameSchema);
