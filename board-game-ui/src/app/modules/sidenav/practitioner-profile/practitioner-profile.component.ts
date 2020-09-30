import { Component, OnInit } from '@angular/core';
import {UserService} from '../../../services/user.service';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {GameAdminProfile} from '../../../models/user.model';

@Component({
  selector: 'app-practitioner-profile',
  templateUrl: './practitioner-profile.component.html',
  styleUrls: ['./practitioner-profile.component.scss']
})
export class PractitionerProfileComponent implements OnInit {

  public userId: string;
  public user: GameAdminProfile;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) {
    this.userId = route.snapshot.paramMap.get('id');
  }

  public ngOnInit(): void {
    this.userService.getGameAdminProfile(this.userId).subscribe(
      success => {
        this.user = success;
        // this.user.gameAdminInfo = this.user.gameAdminInfo.split('\n');
      },
      error => {
        alert(error.error);
      }
    );
  }

  public getSafeUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }

  public openGameProfile(gameId: string): void {
    this.router.navigate([`board-games/game/${gameId}`]);
  }

}
