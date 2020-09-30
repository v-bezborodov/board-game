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
const game_1 = require("../model/game");
class GameRepository {
    static create(game) {
        return game_1.Game.create(game);
    }
    static getAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_1.Game.find({});
        });
    }
    static getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_1.Game.find({ userId: userId });
        });
    }
    static updatePosition(game) {
        return __awaiter(this, void 0, void 0, function* () {
            yield game_1.Game.update({ _id: game._id }, { "activeMembers": game.activeMembers, "decks": game.decks, "status": game.status });
        });
    }
    static getById(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield game_1.Game.findById(gameId);
        });
    }
    static delete(gameId) {
        return __awaiter(this, void 0, void 0, function* () {
            return game_1.Game.deleteOne({ _id: gameId });
        });
    }
}
exports.GameRepository = GameRepository;
//# sourceMappingURL=game.repository.js.map