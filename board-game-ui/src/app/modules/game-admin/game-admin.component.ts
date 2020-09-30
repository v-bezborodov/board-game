import {Component, OnDestroy, OnInit} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {Role} from '../../enums/role.enum';
import {UserService} from '../../services/user.service';
import {User} from '../../models/user.model';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';

@Component({
  selector: 'app-game-admin',
  templateUrl: './game-admin.component.html',
  styleUrls: ['./game-admin.component.scss']
})
export class GameAdminComponent implements OnInit {

  userId: string;
  user: any;

  constructor(private userService: UserService,
              private route: ActivatedRoute,
              private sanitizer: DomSanitizer) {
    this.userId = route.snapshot.paramMap.get('id');
  }

  ngOnInit(): void {
    this.userService.getGameAdminProfile(this.userId).subscribe(
      success => {
        this.user = success;
        this.user.gameAdminInfo = this.user.gameAdminInfo.split('\n');
      },
      error => {
        alert(error.error);
      }
    );
  }

  getSafeUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }

}
