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
const conversation_repository_1 = require("../repository/conversation.repository");
const user_service_1 = require("./user.service");
const axios = require('axios');
class ConversationService {
    static create(createConversationDto, currentUserId) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            const conversation = {
                _id: null,
                name: null,
                image: null,
                users: createConversationDto.userIds,
                lastMessage: null,
                unreadCount: 0,
                lastMessageDate: null
            };
            const savedConversation = yield conversation_repository_1.ConversationRepository.create(conversation);
            const currentUser = yield user_service_1.UserService.findById(currentUserId);
            const destinationId = savedConversation.users.find(user => { var _a; return user !== ((_a = currentUser) === null || _a === void 0 ? void 0 : _a._id); });
            if (destinationId) {
                const destination = yield user_service_1.UserService.findById(destinationId);
                conversation.name = ((_a = destination) === null || _a === void 0 ? void 0 : _a.name) ? destination.name : null;
                conversation.image = ((_b = destination) === null || _b === void 0 ? void 0 : _b.avatar) ? destination.avatar : null;
            }
            return conversation;
        });
    }
    static getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const conversations = yield conversation_repository_1.ConversationRepository.findByUserId(userId);
            if (!conversations) {
                return [];
            }
            for (let conversation of conversations) {
                const destinationId = conversation.users.find((user) => user !== userId);
                if (destinationId) {
                    yield user_service_1.UserService.findById(destinationId).then((destination) => {
                        var _a, _b;
                        conversation._doc.name = ((_a = destination) === null || _a === void 0 ? void 0 : _a.name) ? destination.name : null;
                        conversation._doc.image = ((_b = destination) === null || _b === void 0 ? void 0 : _b.avatar) ? destination.avatar : null;
                    });
                }
            }
            return conversations;
        });
    }
}
exports.ConversationService = ConversationService;
//# sourceMappingURL=conversation.service.js.map