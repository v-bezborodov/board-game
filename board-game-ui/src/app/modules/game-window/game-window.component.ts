import {ChangeDetectorRef, Component, Inject, OnDestroy, OnInit, ViewEncapsulation} from '@angular/core';
import {Socket} from 'ngx-socket-io';
import {DomSanitizer} from '@angular/platform-browser';
import {UserStoreService} from '../../services/stores/user-store.service';
import {CdkDragEnd} from '@angular/cdk/drag-drop';
import {Deck} from '../../models/deck.model';
import {Router} from '@angular/router';
import {ZoomMtg} from '@zoomus/websdk';
import {User} from '../../models/user.model';
import {DOCUMENT} from '@angular/common';

@Component({
  selector: 'app-game-window',
  templateUrl: './game-window.component.html',
  styleUrls: ['./game-window.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class GameWindowComponent implements OnInit, OnDestroy {

  allMembers: any = [];
  members: any[] = [];
  background = '';
  currentUser: User;
  decks: Deck[];
  adminId: string;
  isCall = false;

  constructor(private socket: Socket,
              private router: Router,
              private cdr: ChangeDetectorRef,
              private sanitizer: DomSanitizer,
              @Inject(DOCUMENT) private document: Document) {
    this.currentUser = UserStoreService.currentUser;
  }

  ngOnInit(): void {
    UserStoreService.getSubscription().subscribe(user => {
      this.currentUser = user;
    });

    this.socket.connect();
    this.socket.on('message', (msg: any) => {
      if (msg.event === 'connected') {
        this.allMembers = msg.members;
        this.members = this.allMembers.filter(member => !member.isAdmin);
        if (msg && msg.signature) {
          this.startMeeting(msg.signature, msg.meetingId, this.currentUser._id);
        }
        this.background = msg.background;
        this.decks = msg.decks;
        this.adminId = msg.adminId;
        this.cdr.detectChanges();
      }

      if (msg.event === 'user_join') {
        this.allMembers = msg.members;
        this.members = this.allMembers.filter(member => !member.isAdmin);
        this.cdr.detectChanges();
      }

      if (msg.event === 'user_disconnect') {
        this.allMembers = this.allMembers.filter(user => user.id !== msg.id);
        this.members = this.allMembers.filter(member => !member.isAdmin);
      }

      if (msg.event === 'moved-chip') {
        this.members.forEach(member => {
          if (member.id === msg.id) {
            member.position = {
              x: msg.position.x,
              y: msg.position.y
            };
          }
        });
      }

      if (msg.event === 'moved-card') {
        this.decks
          .find(deck => deck._id === msg.deckId).cards
          .find((card: any) => card._id === msg.cardId)
          .position = msg.position;
      }

      if (msg.event === 'state-card-changed') {
        this.decks
          .find(deck => deck._id === msg.deckId).cards
          .find((card: any) => card._id === msg.cardId)
          .isOpen = msg.state;
      }

      if (msg.event === 'game-closed') {
        this.document.getElementById('zmmtg-root').style.display = 'none';
        this.router.navigate(['/board-games/games']);
      }
    });
  }

  getBackground() {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${this.background}")`);
  }

  getSafeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }

  press(event, deck, card) {
    if (this.currentUser._id !== this.adminId) {
      return;
    }

    if (event.code === 'KeyF') {
      card.isOpen = !card.isOpen;

      this.socket.emit('state-card-change', {
        deckId: deck._id,
        cardId: card._id,
        state: card.isOpen
      });
    }
  }

  chipMoved(event: CdkDragEnd, member: any) {
    this.socket.emit('move-chip', {
      id: member.id,
      position: {x: ((event.source._dragRef) as any)._passiveTransform.x, y: ((event.source._dragRef) as any)._passiveTransform.y}
    });
  }

  cardMoved(event: CdkDragEnd, deck: any, card: any) {
    this.socket.emit('move-card', {
      deckId: deck._id,
      cardId: card._id,
      position: {x: ((event.source._dragRef) as any)._passiveTransform.x, y: ((event.source._dragRef) as any)._passiveTransform.y}
    });
  }

  stopGame() {
    this.socket.emit('close-game', {});
    this.document.getElementById('zmmtg-root').style.display = 'none';
    this.router.navigate(['/board-games/games']);
  }

  identify(index, item) {
    return item.id;
  }

  startMeeting(signature: any, meetingId: number, username: string) {
    if (this.isCall) {
      return;
    }

    this.isCall = true;

    ZoomMtg.init({
      leaveUrl: 'http://94.250.251.166:4200',
      isSupportAV: true,
      success: (success) => {
        console.log(success);

        ZoomMtg.join({
          signatureEndpoint: signature,
          meetingNumber: meetingId,
          userName: username,
          apiKey: 'vaK6r6SuQVOUGrRnV-c6Gw',
          success: () => {
            console.log(success);
          },
          error: (error) => {
            console.log(error);
          }
        });

      },
      error: (error) => {
        console.log(error);
      }
    });
  }

  ngOnDestroy(): void {
    this.socket.disconnect();
  }

}
