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
const game_service_1 = require("../service/game.service");
class GameController {
    getRouter() {
        return express_1.default.Router()
            .post("", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const game = {
                name: req.body.name,
                patternId: req.body.patternId,
                userId: req.query.currentUserId,
                patternName: req.body.patternName,
                date: req.body.date,
                price: req.body.price,
                description: req.body.description,
                avatar: req.body.avatar
            };
            const savedPattern = yield game_service_1.GameService.create(game).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(savedPattern);
        }))
            .get("", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.currentUserId;
            const games = yield game_service_1.GameService.getAll(userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(games);
        }))
            .get("/profile/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            const game = yield game_service_1.GameService.getProfileById(id).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(game);
        }))
            .put("/:gameId/requests", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.currentUserId;
            const gameId = req.params.gameId;
            yield game_service_1.GameService.createRequest(gameId, userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .get("/requests", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.currentUserId;
            const requests = yield game_service_1.GameService.getRequests(userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(requests);
        }))
            .put("/requests/:gameId/:userId/accept", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const gameId = req.params.gameId;
            yield game_service_1.GameService.acceptRequest(gameId, userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .put("/requests/:gameId/:userId/decline", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const gameId = req.params.gameId;
            yield game_service_1.GameService.declineRequest(gameId, userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield game_service_1.GameService.deleteById(id).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .put("/:id/start", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield game_service_1.GameService.start(id).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }));
    }
}
exports.GameController = GameController;
//# sourceMappingURL=game.controller.js.map