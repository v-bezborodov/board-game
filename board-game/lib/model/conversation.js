"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_connection_1 = require("../config/database.connection");
exports.ConversationSchema = new mongoose_1.Schema({
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
exports.Conversation = database_connection_1.mongoose.model("conversations", exports.ConversationSchema);
//# sourceMappingURL=conversation.js.map