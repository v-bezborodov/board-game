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
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (Object.hasOwnProperty.call(mod, k)) result[k] = mod[k];
    result["default"] = mod;
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
const express = __importStar(require("express"));
const auth_service_1 = require("../service/auth.service");
class AuthController {
    getRouter() {
        return express.Router()
            .post("/signup", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const signupRequest = {
                name: req.body.name,
                email: req.body.email,
                password: req.body.password,
                role: req.body.role
            };
            yield auth_service_1.AuthService.signup(signupRequest)
                .then((value) => res.status(201).send(value))
                .catch((e) => {
                console.log(e.stack);
                if (e.message.includes('E11000')) {
                    res.status(500).send('Почтовый ящик уже используется в системе.');
                }
                res.status(500).send(e.message);
            });
        }))
            .post("/signin", (req, res) => __awaiter(this, void 0, void 0, function* () {
            const email = req.body.email;
            const password = req.body.password;
            const authData = yield auth_service_1.AuthService.signin(email, password).catch((e) => {
                console.log(e.stack);
                res.status(500).send(e.message);
            });
            res.status(200).send(authData);
        }));
    }
}
exports.AuthController = AuthController;
//# sourceMappingURL=auth.controller.js.map