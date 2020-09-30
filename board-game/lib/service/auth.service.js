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
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const role_1 = require("../enum/role");
const auth_data_1 = require("../model/dto/auth-data");
const user_service_1 = require("./user.service");
const SECRET_KEY = 'is_is_very_secret_key';
const ACCESS_TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) + 6000000 * 60;
const REFRESH_TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) + 3600 * 60;
class AuthService {
    static checkAuthorization(token) {
        return jsonwebtoken_1.default.verify(token, SECRET_KEY);
    }
    static signin(email, password) {
        return __awaiter(this, void 0, void 0, function* () {
            const user = yield user_service_1.UserService.findByEmail(email);
            if (!user || !bcrypt_nodejs_1.default.compareSync(password, user.password)) {
                throw new Error("Почтовый ящик или пароль не верны.");
            }
            user.password = '';
            return this.buildAuthData(user);
        });
    }
    static signup(signupRequest) {
        return __awaiter(this, void 0, void 0, function* () {
            const isExist = yield user_service_1.UserService.isExistByEmail(signupRequest.email);
            if (isExist) {
                throw new Error('Пользователь с таким почтовым ящиком уже используется.');
            }
            if (![role_1.Role.GAME_ADMIN.toString(), role_1.Role.USER.toString()].includes(signupRequest.role)) {
                throw new Error('Роль указана неверно.');
            }
            const salt = bcrypt_nodejs_1.default.genSaltSync(12);
            const hashedPassword = bcrypt_nodejs_1.default.hashSync(signupRequest.password, salt);
            const user = {
                _id: null,
                name: signupRequest.name,
                role: signupRequest.role,
                email: signupRequest.email,
                password: hashedPassword,
                avatar: '',
                gameAdminInfo: '',
                country: '',
                city: ''
            };
            yield user_service_1.UserService.create(user);
            const savedUser = yield user_service_1.UserService.findByEmail(user.email);
            return this.buildAuthData(savedUser);
        });
    }
    static buildAuthData(user) {
        return __awaiter(this, void 0, void 0, function* () {
            const accessTokenExpirationTime = ACCESS_TOKEN_EXPIRATION_TIME;
            const refreshTokenExpirationTime = REFRESH_TOKEN_EXPIRATION_TIME;
            const accessToken = this.generateToken(user._id, user.email, accessTokenExpirationTime);
            const refreshToken = this.generateToken(user._id, user.email, refreshTokenExpirationTime);
            const tokenResponse = {
                accessToken: accessToken,
                accessTokenExpirationTime: accessTokenExpirationTime.toString(10),
                refreshToken: refreshToken,
                refreshTokenExpirationTime: refreshTokenExpirationTime.toString(10)
            };
            return new auth_data_1.AuthData(tokenResponse, user);
        });
    }
    static generateToken(id, email, expirationTime) {
        return jsonwebtoken_1.default.sign({
            id: id.toString(),
            email: email,
            exp: expirationTime
        }, SECRET_KEY, { algorithm: "HS256" });
    }
}
exports.AuthService = AuthService;
//# sourceMappingURL=auth.service.js.map