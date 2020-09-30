import {Component, OnDestroy} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {AuthService} from '../../services/auth.service';
import {SignUpRequest} from '../../models/sign-up-request.model';
import {AuthData} from '../../models/auth-data.model';
import {TokenStoreService} from '../../services/stores/token-store.service';
import {UserStoreService} from '../../services/stores/user-store.service';
import {Router} from '@angular/router';

@Component({
  selector: 'app-sign-up',
  templateUrl: './sign-up.component.html',
  styleUrls: ['./sign-up.component.scss']
})
export class SignUpComponent implements OnDestroy {

  hide = true;

  subscription: Subscription = new Subscription();
  signupRequest: SignUpRequest = new SignUpRequest();

  singUpForm = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
    role: new FormControl('USER', Validators.required)
  });

  constructor(private authService: AuthService,
              private router: Router) {
  }

  signUp(): void {
    this.signupRequest.email = this.singUpForm.controls.email.value;
    this.signupRequest.name = this.singUpForm.controls.name.value;
    this.signupRequest.password = this.singUpForm.controls.password.value;
    this.signupRequest.role = this.singUpForm.controls.role.value;

    this.subscription = this.authService.signup(this.signupRequest).subscribe((authData: AuthData) => {
      TokenStoreService.setTokenStore(authData.tokenResponse);
      UserStoreService.setCurrentUser(authData.user);
      sessionStorage.setItem('userId', authData.user._id);
    }, error => {
      alert(error.error);
    }, () => {
      this.router.navigate(['/board-games/games']);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
