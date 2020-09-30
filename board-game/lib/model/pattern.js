"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const database_connection_1 = require("../config/database.connection");
exports.Pattern = database_connection_1.mongoose.model("Pattern", new mongoose_1.Schema({ userId: String, isPublish: Boolean }, { strict: false }));
//# sourceMappingURL=pattern.js.map