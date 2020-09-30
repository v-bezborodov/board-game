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
const bcrypt_nodejs_1 = __importDefault(require("bcrypt-nodejs"));
const user_repository_1 = require("../repository/user.repository");
const game_service_1 = require("./game.service");
const pattern_service_1 = require("./pattern.service");
class UserService {
    static isExistByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.UserRepository.isExistByEmail(email);
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.UserRepository.findById(id).catch(() => {
                throw new Error("User with this id is not found.");
            });
        });
    }
    static getGameAdminProfile(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findById(id).catch(() => {
                throw new Error("Game admin with this id is not found.");
            });
            if (user.role !== 'GAME ADMIN') {
                throw new Error("Game admin with this id is not found.");
            }
            const games = yield game_service_1.GameService.getAllByUserId(user._id);
            games.sort((a, b) => Date.parse(a.date.toString()) - Date.parse(b.date.toString()));
            const pattern = yield pattern_service_1.PatternService.getAllPublishingByUserId(user._id);
            return {
                _id: user._id,
                name: user.name,
                role: user.role,
                email: user.email,
                avatar: user.avatar,
                gameAdminInfo: user.gameAdminInfo,
                country: user.country,
                city: user.city,
                nearestGame: games[0],
                patterns: pattern
            };
        });
    }
    static findAll(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_repository_1.UserRepository.findById(id).catch(() => {
                throw new Error("User with this id is not found.");
            });
            // if (user!.role != Role.ADMIN) {
            //     throw new Error("You have not permissions");
            // }
            return (yield user_repository_1.UserRepository.findAll()).filter(temp => temp._id != user._id);
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.UserRepository.findByEmail(email).catch(() => {
                throw new Error("User with this email is not found.");
            });
        });
    }
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_repository_1.UserRepository.create(user);
        });
    }
    static updatePersonalData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const currentUser = yield this.findById(user._id);
            currentUser.name = user.name;
            currentUser.avatar = user.avatar;
            return yield currentUser.save();
        });
    }
    static updateGameAdminInfo(userId, gameAdminInfo) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield this.findById(userId);
            user.gameAdminInfo = gameAdminInfo.gameAdminInfo;
            user.country = gameAdminInfo.country;
            user.city = gameAdminInfo.city;
            return yield user.save();
        });
    }
    static updatePassword(user) {
        return __awaiter(this, void 0, void 0, function* () {
            let currentUser = yield this.findById(user._id);
            if (!user || !bcrypt_nodejs_1.default.compareSync(user.password, currentUser.password)) {
                throw new Error("Password is incorrect");
            }
            const salt = bcrypt_nodejs_1.default.genSaltSync(12);
            currentUser.password = bcrypt_nodejs_1.default.hashSync(user.newPassword, salt);
            return yield currentUser.save();
        });
    }
}
exports.UserService = UserService;
//# sourceMappingURL=user.service.js.map