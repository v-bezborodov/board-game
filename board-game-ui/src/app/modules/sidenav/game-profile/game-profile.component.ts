import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {GameService} from '../../../services/game.service';
import {GameProfileDto} from '../../../models/game.model';

@Component({
  selector: 'app-game-profile',
  templateUrl: './game-profile.component.html',
  styleUrls: ['./game-profile.component.scss']
})
export class GameProfileComponent implements OnInit {

  public gameId: string;
  public game: GameProfileDto;

  constructor(private gameService: GameService,
              private route: ActivatedRoute,
              private router: Router,
              private sanitizer: DomSanitizer) {
    this.gameId = route.snapshot.paramMap.get('id');
  }

  public ngOnInit(): void {
    this.gameService.getProfileById(this.gameId).subscribe(
      (game: GameProfileDto) => {
        this.game = game;
      }
    );
  }

  public getSafeUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }

  public openUserProfile(userId: string): void {
    this.router.navigate([`board-games/practitioner/${userId}`]);
  }

}
