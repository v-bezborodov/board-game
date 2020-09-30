import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {SignInRequest} from '../../models/sign-in-request.model';
import {SocialAuthService, FacebookLoginProvider, SocialUser } from 'angularx-social-login';
import {AuthService} from '../../services/auth.service';
import {Subscription} from 'rxjs';
import {AuthData} from '../../models/auth-data.model';
import {TokenStoreService} from '../../services/stores/token-store.service';
import {UserStoreService} from '../../services/stores/user-store.service';
import {Router} from '@angular/router';
import {Role} from '../../enums/role.enum';


@Component({
  selector: 'app-sign-in',
  templateUrl: './sign-in.component.html',
  styleUrls: ['./sign-in.component.scss']
})
export class SignInComponent implements OnInit, OnDestroy {

  hide = true;
  subscription: Subscription = new Subscription();
  private user: SocialUser;

  signInRequest: SignInRequest = new SignInRequest();

  singInForm = new FormGroup({
    email: new FormControl('', Validators.required),
    password: new FormControl('', Validators.required)
  });

  constructor(private socialAuthService: SocialAuthService,
              private authSrvc: AuthService,
              private router: Router) { }

  signInWithFB(): void {
    this.socialAuthService.signIn(FacebookLoginProvider.PROVIDER_ID)
      .then((res) => {
        console.log(res);
        // TokenStoreService.setTokenStore(res.authToken);
        // UserStoreService.setCurrentUser(res.user);
        // sessionStorage.setItem('userId', res.user._id);
      });

    // this.subscription = this.authSrvc.signin(this.signInRequest).subscribe((authData: AuthData) => {
    //   TokenStoreService.setTokenStore(authData.tokenResponse);
    //   UserStoreService.setCurrentUser(authData.user);
    //   sessionStorage.setItem('userId', authData.user._id);
    // },

  }

  ngOnInit(): void {
  }

  regularSignIn(): void {
    // console.log('this.signInRequest', this.signInRequest, this.singInForm.controls);
    this.signInRequest.email = this.singInForm.controls.email.value;
    this.signInRequest.password = this.singInForm.controls.password.value;

    this.subscription = this.authSrvc.signin(this.signInRequest).subscribe((authData: AuthData) => {
      TokenStoreService.setTokenStore(authData.tokenResponse);
      UserStoreService.setCurrentUser(authData.user);
      sessionStorage.setItem('userId', authData.user._id);
    }, error => {
      alert(error.error);
    }, () => {
      if (UserStoreService.getCurrentUser().role === Role.ADMIN) {
        this.router.navigate(['/admin']);
      } else {
        this.router.navigate(['/board-games/games']);
      }
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
