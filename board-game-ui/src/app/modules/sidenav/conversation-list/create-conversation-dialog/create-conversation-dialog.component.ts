import {Component, OnInit} from '@angular/core';
import {UserService} from '../../../../services/user.service';
import {User} from '../../../../models/user.model';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {MatDialogRef} from '@angular/material/dialog';
import {UserStoreService} from '../../../../services/stores/user-store.service';

@Component({
  selector: 'app-create-conversation-dialog',
  templateUrl: './create-conversation-dialog.component.html',
  styleUrls: ['./create-conversation-dialog.component.scss']
})
export class CreateConversationDialogComponent implements OnInit {

  public users: User[] = [];

  constructor(private userService: UserService,
              private sanitizer: DomSanitizer,
              public dialogRef: MatDialogRef<CreateConversationDialogComponent>) { }

  public ngOnInit(): void {
    this.userService.getAll().subscribe(
      (users) => {
        this.users = users.filter(user => user._id !== UserStoreService.getCurrentUser()._id);
      }
    );
  }

  public getSafeUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }

  public chooseUser(userId: any): void {
    this.dialogRef.close(userId);
  }

  public close(): void {
    this.dialogRef.close();
  }

}
