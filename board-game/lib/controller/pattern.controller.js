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
const pattern_service_1 = require("../service/pattern.service");
class PatternController {
    getRouter() {
        return express_1.default.Router()
            .post("", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const pattern = req.body;
            pattern.userId = req.query.currentUserId;
            const savedPattern = yield pattern_service_1.PatternService.create(pattern).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(savedPattern);
        }))
            .delete("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield pattern_service_1.PatternService.deleteById(id).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .get("/:id", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const id = req.params.id;
            yield pattern_service_1.PatternService.findById(id).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .put("", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const pattern = req.body;
            pattern.userId = req.query.currentUserId;
            yield pattern_service_1.PatternService.update(pattern).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .put("/publish", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const patternId = req.body.id;
            yield pattern_service_1.PatternService.publish(patternId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send();
        }))
            .get("", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.currentUserId;
            const patterns = yield pattern_service_1.PatternService.getAllByUserId(userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(patterns);
        }))
            .get("/published/all", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const userId = req.query.currentUserId;
            const patterns = yield pattern_service_1.PatternService.getAllByUserId(userId).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(patterns.filter((pattern) => pattern._doc.isPublish));
        }))
            .post("/copy", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const pattern = yield pattern_service_1.PatternService.copy(req.body.id, req.body.name).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(201).send(pattern);
        }));
    }
}
exports.PatternController = PatternController;
//# sourceMappingURL=pattern.controller.js.map