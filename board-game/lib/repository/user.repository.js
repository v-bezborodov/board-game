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
const user_1 = require("../model/user");
class UserRepository {
    static create(user) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.create(user);
        });
    }
    static isExistByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.User.exists({ email: email });
        });
    }
    static findById(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.User.findById(userId);
        });
    }
    static findAll() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield user_1.User.find({});
        });
    }
    static findByEmail(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return (yield user_1.User.find({ email: email }))[0];
        });
    }
    static delete(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return user_1.User.deleteOne({ _id: userId });
        });
    }
}
exports.UserRepository = UserRepository;
//# sourceMappingURL=user.repository.js.map