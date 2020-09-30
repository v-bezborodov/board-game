import {Injectable} from '@angular/core';
import {TokenResponse} from '../../models/token-response.model';

const ACCESS_TOKEN = 'accessToken';
const REFRESH_TOKEN = 'refreshToken';

const ACCESS_TOKEN_EXPIRATION_TIME = 'accessTokenExpirationTime';
const REFRESH_TOKEN_EXPIRATION_TIME = 'refreshTokenExpirationTime';

@Injectable({
  providedIn: 'root'
})
export class TokenStoreService {

  static get accessToken(): string {
    return sessionStorage.getItem(ACCESS_TOKEN);
  }

  static set accessToken(accessToken: string) {
    sessionStorage.setItem(ACCESS_TOKEN, accessToken);
  }

  static get refreshToken(): string {
    return sessionStorage.getItem(REFRESH_TOKEN);
  }

  static set refreshToken(accessToken: string) {
    sessionStorage.setItem(REFRESH_TOKEN, accessToken);
  }

  static get accessTokenExpirationTime(): string {
    return sessionStorage.getItem(ACCESS_TOKEN_EXPIRATION_TIME);
  }

  static set accessTokenExpirationTime(accessTokenExpirationTime: string) {
    sessionStorage.setItem(ACCESS_TOKEN_EXPIRATION_TIME, accessTokenExpirationTime);
  }

  static get refreshTokenExpirationTime(): string {
    return sessionStorage.getItem(REFRESH_TOKEN_EXPIRATION_TIME);
  }

  static set refreshTokenExpirationTime(refreshTokenExpirationTime: string) {
    sessionStorage.setItem(REFRESH_TOKEN_EXPIRATION_TIME, refreshTokenExpirationTime);
  }

  static setTokenStore(tokenResponse: TokenResponse) {
    this.accessToken = tokenResponse.accessToken;
    this.accessTokenExpirationTime = tokenResponse.accessTokenExpirationTime.toString();
    this.refreshToken = tokenResponse.refreshToken;
    this.refreshTokenExpirationTime = tokenResponse.refreshTokenExpirationTime.toString();
  }

}
