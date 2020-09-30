import {Injectable} from '@angular/core';
import {environment} from '../../environments/environment';
import {HttpClient} from '@angular/common/http';
import {SignInRequest} from '../models/sign-in-request.model';
import {Observable} from 'rxjs';
import {TokenResponse} from '../models/token-response.model';
import {SignUpRequest} from '../models/sign-up-request.model';
import {TokenStoreService} from './stores/token-store.service';
import {AuthData} from '../models/auth-data.model';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  authUrl = environment.apiUrl.auth;

  constructor(private http: HttpClient) {
  }

  signin(signInRequest: SignInRequest): Observable<AuthData> {
    return this.http.post<AuthData>(this.authUrl.signin, signInRequest);
  }

  signup(signUpRequest: SignUpRequest): Observable<AuthData> {
    return this.http.post<AuthData>(this.authUrl.signup, signUpRequest);
  }

  refresh(): Observable<TokenResponse> {
    return this.http.post<TokenResponse>(this.authUrl.refresh, TokenStoreService.refreshToken);
  }

}
