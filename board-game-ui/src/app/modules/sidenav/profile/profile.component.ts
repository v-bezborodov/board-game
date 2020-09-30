import {ChangeDetectorRef, Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {UserService} from '../../../services/user.service';
import {UserStoreService} from '../../../services/stores/user-store.service';
import {Subscription} from 'rxjs';
import {GameAdminInfo, User} from '../../../models/user.model';
import {UpdatePasswordRequest} from '../../../models/update-password-request.model';
import {FileService} from '../../../services/file.service';
import {environment} from '../../../../environments/environment';
import {Role} from '../../../enums/role.enum';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.scss']
})
export class ProfileComponent implements OnInit, OnDestroy {

  previousPasswordHide = true;
  newPasswordHide = true;
  confirmPasswordHide = true;

  user: any = {};
  gameAdminInfo: GameAdminInfo = new GameAdminInfo();
  defaultImagePath = `url('assets/images/avatar-default.png')`;

  subscription: Subscription = new Subscription();

  passwordUpdateRequest: UpdatePasswordRequest = new UpdatePasswordRequest();

  personalDataForm = new FormGroup({
    name: new FormControl('', Validators.required)
  });

  gameAdminForm = new FormGroup({
    info: new FormControl('', Validators.required),
    country: new FormControl('', Validators.required),
    city: new FormControl('', Validators.required)
  });

  passwordForm = new FormGroup({
    previousPassword: new FormControl('', Validators.required),
    newPassword: new FormControl('', Validators.required),
    confirmPassword: new FormControl('', Validators.required)
  });

  constructor(private userService: UserService,
              private fileService: FileService,
              private cdr: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.user = {...UserStoreService.getCurrentUser()};

    UserStoreService.getSubscription().subscribe(user => {
      this.user = {...user};
      this.personalDataForm.controls.name.setValue(user.name);

      if (user.role === Role.GAME_ADMIN) {
        this.gameAdminForm.controls.info.setValue(user.gameAdminInfo);
      }
    });

    this.personalDataForm.controls.name.setValue(this.user.name);

    if (this.user.role === Role.GAME_ADMIN) {
      this.gameAdminForm.controls.info.setValue(this.user.gameAdminInfo);
    }
  }

  uploadAvatar(file: any): void {
    const image = file.target.files[0];
    const formdata = new FormData();
    formdata.append('file', image);
    this.fileService.upload(formdata).subscribe(imageUrl => {
      this.user.avatar = `${environment.staticUrl}/static/${imageUrl.path}`;
      this.cdr.detectChanges();
    });
  }

  updatePersonalData(): void {
    this.user.name = this.personalDataForm.controls.name.value;

    this.subscription = this.userService.updatePersonalData(this.user).subscribe((user: User) => {
      UserStoreService.setCurrentUser(user);
      alert('Профиль обновлен');
    }, error => {
      alert(error.error);
    });
  }

  updateGameAdminInfo(): void {
    this.gameAdminInfo.gameAdminInfo = this.gameAdminForm.controls.info.value;
    this.gameAdminInfo.country = this.gameAdminForm.controls.country.value;
    this.gameAdminInfo.city = this.gameAdminForm.controls.city.value;

    this.userService.updateGameAdminInfo(this.gameAdminInfo).subscribe((user: User) => {
      UserStoreService.setCurrentUser(user);
      alert('Профиль обновлен');
    }, error => {
      alert(error.error);
    });
  }

  updatePassword(): void {
    if (this.passwordForm.controls.newPassword.value !== this.passwordForm.controls.confirmPassword.value) {
      this.passwordForm.controls.confirmPassword.setErrors( {confirmError: true});
      return;
    }
    this.passwordUpdateRequest.id = UserStoreService.getCurrentUser()._id;
    this.passwordUpdateRequest.newPassword = this.passwordForm.controls.newPassword.value;
    this.passwordUpdateRequest.password = this.passwordForm.controls.previousPassword.value;

    this.subscription = this.userService.updatePassword(this.passwordUpdateRequest).subscribe(() => {
      alert('Пароль успешно изменен');
    }, error => {
      alert(error.error);
    });
  }

  ngOnDestroy(): void {
    this.subscription.unsubscribe();
  }

}
