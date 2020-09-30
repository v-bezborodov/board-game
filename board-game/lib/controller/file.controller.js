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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const fs = __importStar(require("fs"));
const uuid = __importStar(require("uuid"));
const multer = require('multer');
var storage = multer.memoryStorage();
var upload = multer({ storage: storage });
class FileController {
    getRouter() {
        return express_1.default.Router()
            .post("", upload.single("file"), (req, res) => __awaiter(this, void 0, void 0, function* () {
            const name = uuid.v4() + req.file.originalname.match(/\.[^.]+$/)[0];
            fs.writeFileSync(`./files/${name}`, req.file.buffer);
            res.status(200).send({ path: `${name}` });
        }));
    }
}
exports.FileController = FileController;
//# sourceMappingURL=file.controller.js.map