"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_connection_1 = require("../config/database.connection");
exports.MessageSchema = new mongoose_1.Schema({
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
exports.Message = database_connection_1.mongoose.model("messages", exports.MessageSchema);
//# sourceMappingURL=message.js.map