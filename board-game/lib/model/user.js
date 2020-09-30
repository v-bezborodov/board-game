"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_connection_1 = require("../config/database.connection");
exports.UserSchema = new mongoose_1.Schema({
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
exports.User = database_connection_1.mongoose.model("User", exports.UserSchema);
//# sourceMappingURL=user.js.map