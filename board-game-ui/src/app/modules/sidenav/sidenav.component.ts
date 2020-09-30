import {ChangeDetectorRef, Component, OnInit} from '@angular/core';
import {TokenStoreService} from '../../services/stores/token-store.service';
import {UserStoreService} from '../../services/stores/user-store.service';
import {User} from '../../models/user.model';
import {Router} from '@angular/router';
import {CreateGameDialogComponent} from './games/create-game-dialog/create-game-dialog.component';
import {MatDialog} from '@angular/material/dialog';
import {CreateGamePatternDialogComponent} from './game-pattern/create-game-pattern-dialog/create-game-pattern-dialog.component';
import {CopyGamePatternDialogComponent} from './game-pattern/copy-game-pattern-dialog/copy-game-pattern-dialog.component';
import {DialogService} from '../../services/dialog.service';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  currentUser: User = new User();

  gameSubList = false;
  gamePatternSubList = false;

  constructor(private router: Router,
              private dialog: MatDialog,
              private cdr: ChangeDetectorRef,
              private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    this.currentUser = UserStoreService.getCurrentUser();
    if (this.currentUser === undefined || this.currentUser === null) {
      this.signout();
    }

    UserStoreService.getSubscription().subscribe(user => {
      this.currentUser = user;
    });
    this.router.navigate(['/board-games/games']);
  }

  addGame(): void {
    const dialogRef = this.dialog.open(CreateGameDialogComponent, {
      width: DialogService.getDialogWindowWidth()
    });

    dialogRef.afterClosed().subscribe(() => {
      this.cdr.detectChanges();
    });

  }

  addGamePattern(): void {
    const dialogRef = this.dialog.open(CreateGamePatternDialogComponent, {
      width: DialogService.getDialogWindowWidth()
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  copyGamePattern(): void {
    const dialogRef = this.dialog.open(CopyGamePatternDialogComponent, {
      width: DialogService.getDialogWindowWidth()
    });
    dialogRef.afterClosed().subscribe(() => {
      this.cdr.detectChanges();
    });
  }

  signout(): void {
    TokenStoreService.accessToken = '';
    TokenStoreService.accessTokenExpirationTime = '';
    TokenStoreService.refreshToken = '';
    TokenStoreService.refreshTokenExpirationTime = '';

    UserStoreService.setCurrentUser(new User());

    this.router.navigate(['/signin']);

  }

  gameSubListAction(): void {
    this.gameSubList = !this.gameSubList;
    this.gamePatternSubList = false;
    this.router.navigate(['/board-games/games']);
  }

  gamePatternSubListAction(): void {
    this.gamePatternSubList = !this.gamePatternSubList;
    this.gameSubList = false;
    this.router.navigate(['/board-games/patterns']);
  }

  public getSafeUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }

}
