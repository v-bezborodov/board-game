import {ITokenResponse} from "../token-response";
import {IUser} from "../user";

export class AuthData {
    tokenResponse: ITokenResponse;
    user: IUser;

    constructor(tokenResponse:ITokenResponse, user: IUser) {
        this.tokenResponse = tokenResponse;
        this.user = user;
    }

}
