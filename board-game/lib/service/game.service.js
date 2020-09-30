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
const game_repository_1 = require("../repository/game.repository");
const socket_service_1 = require("./socket.service");
const user_service_1 = require("./user.service");
const axios = require('axios');
class GameService {
    static create(game) {
        return __awaiter(this, void 0, void 0, function* () {
            game.requests = [];
            game.members = [];
            game.activeMembers = [];
            game.status = 'UNACTIVE';
            return yield game_repository_1.GameRepository.create(game);
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_repository_1.GameRepository.delete(id);
        });
    }
    static getProfileById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield game_repository_1.GameRepository.getById(id);
            if (!game) {
                throw new Error("Игра не была найдена");
            }
            const gameDto = {
                _id: game._id,
                name: game.name,
                patternId: game.patternId,
                patternName: game.patternName,
                date: game.date,
                userId: game.userId,
                adminName: (yield user_service_1.UserService.findById(game.userId)).name,
                status: game.status,
                price: game.price,
                description: game.description,
                avatar: game.avatar
            };
            return gameDto;
        });
    }
    static getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield game_repository_1.GameRepository.getById(id);
            if (!game) {
                throw new Error("Игра не была найдена");
            }
            return game;
        });
    }
    static createRequest(gameId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield this.getById(gameId);
            if (game.requests.includes(userId) || game.members.includes(userId)) {
                return;
            }
            game.requests.push(userId);
            yield game.save();
        });
    }
    static acceptRequest(gameId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield this.getById(gameId);
            game.requests = game.requests.filter(requestUserId => requestUserId !== userId);
            game.members = [...game.members, userId];
            yield game.save();
        });
    }
    static updatePosition(game) {
        return __awaiter(this, void 0, void 0, function* () {
            yield game_repository_1.GameRepository.updatePosition(game);
        });
    }
    static declineRequest(gameId, userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield this.getById(gameId);
            game.requests = game.requests.filter(requestUserId => requestUserId !== userId);
            yield game.save();
        });
    }
    static getRequests(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_repository_1.GameRepository.getAllByUserId(userId);
            const requests = [];
            for (const game of games) {
                for (const requestUserId of game.requests) {
                    requests.push({
                        gameId: game._id,
                        gameName: game.name,
                        patternName: game.patternName,
                        userId: requestUserId,
                        userName: (yield user_service_1.UserService.findById(requestUserId)).name
                    });
                }
            }
            return requests;
        });
    }
    static getAll(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_repository_1.GameRepository.getAll();
            const gameDtos = [];
            for (const game of games) {
                gameDtos.push({
                    _id: game._id,
                    name: game.name,
                    patternId: game.patternId,
                    patternName: game.patternName,
                    userId: game.userId,
                    date: game.date,
                    adminName: (yield user_service_1.UserService.findById(game.userId)).name,
                    hasRequest: game.requests.includes(userId),
                    isMember: game.members.includes(userId),
                    membersCount: game.members.length,
                    status: game.status,
                    price: game.price,
                    description: game.description,
                    avatar: game.avatar
                });
            }
            return gameDtos;
        });
    }
    static getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const games = yield game_repository_1.GameRepository.getAllByUserId(userId);
            const gameDtos = [];
            for (const game of games) {
                gameDtos.push({
                    _id: game._id,
                    name: game.name,
                    patternId: game.patternId,
                    patternName: game.patternName,
                    userId: game.userId,
                    date: game.date,
                    adminName: (yield user_service_1.UserService.findById(game.userId)).name,
                    hasRequest: game.requests.includes(userId),
                    isMember: game.members.includes(userId),
                    membersCount: game.members.length,
                    status: game.status,
                    price: game.price,
                    description: game.description,
                    avatar: game.avatar
                });
            }
            return gameDtos;
        });
    }
    static start(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const game = yield this.getById(id);
            const meetingId = yield this.getMeetingId(game.name);
            game.status = 'ACTIVE';
            game.meetingId = meetingId;
            yield game.save();
            socket_service_1.SocketService.createRoom(game.id);
        });
    }
    static getMeetingId(name) {
        return __awaiter(this, void 0, void 0, function* () {
            const response = yield axios.post('https://api.zoom.us/v2/users/c.amazon@yandex.ru/meetings', {
                topic: name,
                type: 1,
                settings: {
                    host_video: "true",
                    participant_video: "true"
                }
            }, {
                headers: {
                    "User-Agent": "Zoom-api-Jwt-Request",
                    "content-type": "application/json",
                    "Authorization": "Bearer eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJhdWQiOm51bGwsImlzcyI6InZhSzZyNlN1UVZPVUdyUm5WLWM2R3ciLCJleHAiOjE1OTYyOTMxMzcsImlhdCI6MTU5NTY4ODMzN30.kqFzwqozSefClw2YYvjd0KNNWVGPGzE2wDUBdo3U9Eg"
                }
            });
            return response.data.id;
        });
    }
}
exports.GameService = GameService;
//# sourceMappingURL=game.service.js.map