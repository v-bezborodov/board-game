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
const role_1 = require("../enum/role");
const pattern_repository_1 = require("../repository/pattern.repository");
const user_service_1 = require("./user.service");
class PatternService {
    static create(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            pattern.isPublish = false;
            return yield pattern_repository_1.PatternRepository.create(pattern);
        });
    }
    static publish(patternId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pattern_repository_1.PatternRepository.publish(patternId);
        });
    }
    static update(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pattern_repository_1.PatternRepository.update(pattern);
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pattern_repository_1.PatternRepository.deleteById(id);
        });
    }
    static getAllByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.findById(userId);
            if (user.role == role_1.Role.ADMIN) {
                return pattern_repository_1.PatternRepository.getAll();
            }
            return pattern_repository_1.PatternRepository.getAllByUserId(userId);
        });
    }
    static getAllPublishingByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield pattern_repository_1.PatternRepository.getAllPublishingByUserId(userId);
        });
    }
    static copy(id, name) {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = yield this.findById(id);
            const newPattern = pattern._doc;
            newPattern._id = undefined;
            newPattern.name = name;
            return this.create(newPattern);
        });
    }
    static findById(patternId) {
        return __awaiter(this, void 0, void 0, function* () {
            const pattern = yield pattern_repository_1.PatternRepository.findById(patternId);
            if (pattern == null) {
                throw new Error("Pattern was not found");
            }
            return pattern;
        });
    }
}
exports.PatternService = PatternService;
//# sourceMappingURL=pattern.service.js.map