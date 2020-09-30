"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_connection_1 = require("../config/database.connection");
exports.GameSchema = new mongoose_1.Schema({
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
exports.Game = database_connection_1.mongoose.model("Game", exports.GameSchema);
//# sourceMappingURL=game.js.map