import bcrypt from "bcrypt-nodejs";
import jwt from "jsonwebtoken";
import {Role} from "../enum/role";
import {AuthData} from "../model/dto/auth-data";
import {SignupRequest} from "../model/dto/signup-request";
import {ITokenResponse} from "../model/token-response";
import {IUser} from "../model/user";
import {UserService} from "./user.service";

const SECRET_KEY = 'is_is_very_secret_key';
const ACCESS_TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) + 6000000 * 60;
const REFRESH_TOKEN_EXPIRATION_TIME = Math.floor(Date.now() / 1000) + 3600 * 60;

export class AuthService {

    public static checkAuthorization(token: string): string | object {
        return jwt.verify(token, SECRET_KEY);
    }

    public static async signin(email: string, password: string): Promise<AuthData> {
        const user = await UserService.findByEmail(email);

        if (!user || !bcrypt.compareSync(password, user.password)) {
            throw new Error("Почтовый ящик или пароль не верны.");
        }

        user.password = '';

        return this.buildAuthData(user);
    }

    public static async signup(signupRequest: SignupRequest): Promise<AuthData> {
        const isExist = await UserService.isExistByEmail(signupRequest.email);

        if (isExist) {
            throw new Error('Пользователь с таким почтовым ящиком уже используется.');
        }

        if (![Role.GAME_ADMIN.toString(), Role.USER.toString()].includes(signupRequest.role)) {
            throw new Error('Роль указана неверно.');
        }

        const salt = bcrypt.genSaltSync(12);
        const hashedPassword = bcrypt.hashSync(signupRequest.password, salt);

        const user: IUser = {
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

        await UserService.create(user);

        const savedUser = await UserService.findByEmail(user.email);
        return  this.buildAuthData(savedUser!);
    }


    public static async buildAuthData(user: IUser): Promise<AuthData> {
        const accessTokenExpirationTime = ACCESS_TOKEN_EXPIRATION_TIME;
        const refreshTokenExpirationTime = REFRESH_TOKEN_EXPIRATION_TIME;

        const accessToken = this.generateToken(user._id, user.email, accessTokenExpirationTime);
        const refreshToken = this.generateToken(user._id, user.email, refreshTokenExpirationTime);

        const tokenResponse: ITokenResponse = {
           accessToken: accessToken,
           accessTokenExpirationTime: accessTokenExpirationTime.toString(10),
           refreshToken: refreshToken,
           refreshTokenExpirationTime: refreshTokenExpirationTime.toString(10)
        };
        return new AuthData(
            tokenResponse,
            user
        );
    }

    private static generateToken(id: string, email: string, expirationTime: number): string {
        return jwt.sign({
            id: id.toString(),
            email: email,
            exp: expirationTime
        }, SECRET_KEY, {algorithm: "HS256"});
    }

}
