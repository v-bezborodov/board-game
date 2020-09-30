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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const message_service_1 = require("../service/message.service");
class MessageController {
    getRouter() {
        return express_1.default.Router()
            .post("", (req, res) => __awaiter(this, void 0, void 0, function* () {
            yield message_service_1.MessageService.create(req.body)
                .then((message) => {
                res.status(200).send(message);
            })
                .catch((e) => {
                res.status(500).send(e.message);
            });
        }))
            .get('/:conversationId', (req, res) => __awaiter(this, void 0, void 0, function* () {
            const conversationId = req.params.conversationId;
            yield message_service_1.MessageService.getByConversationId(conversationId)
                .then((message) => {
                res.status(200).send(message);
            })
                .catch((e) => {
                res.status(500).send(e.message);
            });
        }));
    }
}
exports.MessageController = MessageController;
//# sourceMappingURL=message.controller.js.map