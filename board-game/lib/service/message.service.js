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
const message_repository_1 = require("../repository/message.repository");
const user_service_1 = require("./user.service");
class MessageService {
    static create(message) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const savedMessage = yield message_repository_1.MessageRepository.create(message);
            const user = yield user_service_1.UserService.findById(message.authorId);
            return {
                _id: savedMessage._id,
                authorId: savedMessage.authorId,
                authorName: (_a = user) === null || _a === void 0 ? void 0 : _a.name,
                authorImage: (_b = user) === null || _b === void 0 ? void 0 : _b.avatar,
                conversationId: savedMessage.conversationId,
                date: savedMessage.date,
                isRead: savedMessage.isRead,
                text: savedMessage.text
            };
        });
    }
    static getByConversationId(conversationId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const messages = yield message_repository_1.MessageRepository.findByConversationId(conversationId);
            const messagesDto = [];
            for (let message of messages) {
                const user = yield user_service_1.UserService.findById(message.authorId);
                const messageDto = {
                    _id: message._id,
                    authorId: message.authorId,
                    authorName: (_a = user) === null || _a === void 0 ? void 0 : _a.name,
                    authorImage: (_b = user) === null || _b === void 0 ? void 0 : _b.avatar,
                    conversationId: message.conversationId,
                    date: message.date,
                    isRead: message.isRead,
                    text: message.text
                };
                messagesDto.push(messageDto);
            }
            return messagesDto;
        });
    }
}
exports.MessageService = MessageService;
//# sourceMappingURL=message.service.js.map