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
const game_service_1 = require("./game.service");
const pattern_service_1 = require("./pattern.service");
const user_service_1 = require("./user.service");
const axios = require('axios');
const crypto = require('crypto');
class SocketService {
    static setIo(io) {
        this._io = io;
        // this.setListener();
    }
    static createRoom(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            if (this.rooms[gameId]) {
                return;
            }
            const room = this._io.of(`/${gameId}`);
            this.rooms[gameId] = room;
            const game = yield game_service_1.GameService.getById(gameId);
            const pattern = yield pattern_service_1.PatternService.findById(game.patternId);
            pattern._doc.decks.forEach((deck) => {
                deck.cards.forEach((card) => {
                    card.position = { x: 0, y: 0 };
                });
            });
            game.decks = pattern._doc.decks;
            game.save();
            room.on('connection', (socket) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                const userId = socket.handshake.query.userId;
                const user = yield user_service_1.UserService.findById(userId);
                let game = yield game_service_1.GameService.getById(gameId);
                for (const member of game.activeMembers) {
                    if (member.id === userId) {
                        return;
                    }
                }
                const newMember = {
                    id: userId,
                    color: this.getRandomColor(),
                    name: (_a = user) === null || _a === void 0 ? void 0 : _a.name,
                    position: { x: 0, y: 0 },
                    isAdmin: userId === game.userId
                };
                game.activeMembers.push(newMember);
                const pattern = yield pattern_service_1.PatternService.findById(game.patternId);
                yield game_service_1.GameService.updatePosition(game);
                const timestamp = new Date().getTime() - 30000;
                const msg = Buffer.from('vaK6r6SuQVOUGrRnV-c6Gw' + game.meetingId + timestamp + 0).toString('base64');
                const hash = crypto.createHmac('sha256', 'BunEnI7Gxe2nkRsF0TG51SkoTicJvrFC7azi').update(msg).digest('base64');
                const signature = Buffer.from(`vaK6r6SuQVOUGrRnV-c6Gw.${game.meetingId}.${timestamp}.${0}.${hash}`).toString('base64');
                socket.json.send({
                    'event': 'connected',
                    'background': pattern._doc.avatar,
                    'signature': signature,
                    'meetingId': game.meetingId,
                    'members': game.activeMembers,
                    'decks': game.decks,
                    'adminId': pattern._doc.userId
                });
                socket.broadcast.json.send({ 'event': 'user_join', 'members': game.activeMembers });
                socket.on('move-chip', (msg) => __awaiter(this, void 0, void 0, function* () {
                    socket.broadcast.json.send(Object.assign({ 'event': 'moved-chip' }, msg));
                    game = yield game_service_1.GameService.getById(gameId);
                    game.activeMembers.filter(member => member.id == userId)[0].position = {
                        x: msg.position.x,
                        y: msg.position.y
                    };
                    game_service_1.GameService.updatePosition(game);
                }));
                socket.on('move-card', (msg) => __awaiter(this, void 0, void 0, function* () {
                    socket.broadcast.json.send(Object.assign({ 'event': 'moved-card' }, msg));
                    game = yield game_service_1.GameService.getById(gameId);
                    game.decks
                        .find(deck => deck._id === msg.deckId).cards
                        .find((card) => card._id === msg.cardId)
                        .position = msg.position;
                    game_service_1.GameService.updatePosition(game);
                }));
                socket.on('state-card-change', (msg) => __awaiter(this, void 0, void 0, function* () {
                    socket.broadcast.json.send(Object.assign({ 'event': 'state-card-changed' }, msg));
                    game = yield game_service_1.GameService.getById(gameId);
                    game.decks
                        .find(deck => deck._id === msg.deckId).cards
                        .find((card) => card._id === msg.cardId)
                        .isOpen = msg.state;
                    game_service_1.GameService.updatePosition(game);
                }));
                socket.on('close-game', (msg) => __awaiter(this, void 0, void 0, function* () {
                    socket.broadcast.json.send(Object.assign({ 'event': 'game-closed' }, msg));
                    game = yield game_service_1.GameService.getById(gameId);
                    game.decks = [];
                    game.activeMembers = [];
                    game.status = 'INACTIVE';
                    this.rooms[gameId] = undefined;
                    this.deleteMeeting(game.meetingId);
                    game_service_1.GameService.updatePosition(game);
                }));
                socket.on('disconnect', () => __awaiter(this, void 0, void 0, function* () {
                    socket.broadcast.json.send({ 'event': 'user_disconnect', 'id': userId });
                    game = yield game_service_1.GameService.getById(gameId);
                    game.activeMembers = game.activeMembers.filter(member => member.id !== userId);
                    game_service_1.GameService.updatePosition(game);
                }));
            }));
        });
    }
    static deleteMeeting(meetingId) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = axios.delete(`https://api.zoom.us/v2/meetings/${meetingId}`, {
                headers: {
                    "User-Agent": "Zoom-api-Jwt-Request",
                    "content-type": "application/json",
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InZhSzZyNlN1UVZPVUdyUm5WLWM2R3ciLCJleHAiOjE3NTEyNDIyNjAsImlhdCI6MTU5MzQ3MDUxNH0.8VgusCIxo7RKPAYbvK-qziQmy1Rkeo-Re8lMKQ8NEOE"
                }
            });
            console.log(response);
        });
    }
    static getRandomColor() {
        const letters = '0123456789ABCDEF';
        let color = '#';
        for (let i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }
}
exports.SocketService = SocketService;
SocketService.rooms = {};
//# sourceMappingURL=socket.service.js.map