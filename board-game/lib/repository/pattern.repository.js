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
const pattern_1 = require("../model/pattern");
class PatternRepository {
    static create(pattern) {
        return pattern_1.Pattern.create(pattern);
    }
    static update(pattern) {
        return __awaiter(this, void 0, void 0, function* () {
            return pattern_1.Pattern.update({ _id: pattern._id }, pattern);
        });
    }
    static publish(patternId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield pattern_1.Pattern.update({ _id: patternId }, { isPublish: true }, { upsert: true });
        });
    }
    static getAll() {
        return pattern_1.Pattern.find({});
    }
    static getAllByUserId(userId) {
        return pattern_1.Pattern.find({ userId: userId });
    }
    static getAllPublishingByUserId(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return pattern_1.Pattern.find({ userId: userId, isPublish: true });
        });
    }
    static deleteById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            (yield pattern_1.Pattern.findOne({ _id: id })).remove();
        });
    }
    static findById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return pattern_1.Pattern.findOne({ _id: id });
        });
    }
}
exports.PatternRepository = PatternRepository;
//# sourceMappingURL=pattern.repository.js.map