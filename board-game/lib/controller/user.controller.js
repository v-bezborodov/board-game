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
const user_service_1 = require("../service/user.service");
class UserController {
    getRouter() {
        return express_1.default.Router()
            .get("/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const currentUserId = req.query.currentUserId;
            const user = yield user_service_1.UserService.findAll(currentUserId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(user);
        }))
            .get("/current", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const currentUserId = req.query.currentUserId;
            const user = yield user_service_1.UserService.findById(currentUserId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(user);
        }))
            .get("/game-admin/:userId", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.params.userId;
            const user = yield user_service_1.UserService.getGameAdminProfile(userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(user);
        }))
            .put("/data", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = {
                _id: req.body._id,
                name: req.body.name,
                avatar: req.body.avatar
            };
            const updatedUser = yield user_service_1.UserService.updatePersonalData(user).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(updatedUser);
        }))
            .put("/game-admin-info", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.currentUserId;
            const info = req.body;
            const updatedUser = yield user_service_1.UserService.updateGameAdminInfo(userId, info).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(updatedUser);
        }))
            .put("/password", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const user = {
                _id: req.body.id,
                password: req.body.password,
                newPassword: req.body.newPassword
            };
            const updatedUser = yield user_service_1.UserService.updatePassword(user).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(updatedUser);
        }));
    }
}
exports.UserController = UserController;
//# sourceMappingURL=user.controller.js.map