"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose = require('mongoose');
exports.mongoose = mongoose;
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://localhost:27017/board-games", { useNewUrlParser: true, useUnifiedTopology: true });
mongoose.set("useFindAndModify", false);
//# sourceMappingURL=database.connection.js.map