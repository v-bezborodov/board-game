"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const message_1 = require("../model/message");
class MessageRepository {
    static create(message) {
        return message_1.Message.create(message);
    }
    static findByConversationId(conversationId) {
        return __awaiter(this, void 0, void 0, function* () {
            return message_1.Message.find({ conversationId: conversationId }).sort({ date: 1 });
        });
    }
}
exports.MessageRepository = MessageRepository;
//# sourceMappingURL=message.repository.js.map