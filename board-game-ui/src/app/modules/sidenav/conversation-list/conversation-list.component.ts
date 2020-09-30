import {ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {Conversation, CreateConversationDto} from '../../../models/conversation.model';
import {MatDialog} from '@angular/material/dialog';
import {CreateConversationDialogComponent} from './create-conversation-dialog/create-conversation-dialog.component';
import {ConversationService} from '../../../services/conversation.service';
import {UserStoreService} from '../../../services/stores/user-store.service';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {Message, MessageDto} from '../../../models/message.model';
import {MessageService} from '../../../services/message.service';
import {FormControl, FormGroup} from '@angular/forms';

@Component({
  selector: 'app-conversation-list',
  templateUrl: './conversation-list.component.html',
  styleUrls: ['./conversation-list.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class ConversationListComponent implements OnInit {

  @ViewChild('messagesScroll', {static: false}) messagesElement: ElementRef;

  public conversations: Conversation[] = [];
  public currentConversation: Conversation;
  public messages: MessageDto[];
  public currentUserId: any;

  messageFormGroup = new FormGroup({
    message: new FormControl('')
  });

  constructor(private conversationService: ConversationService,
              private messageService: MessageService,
              private sanitizer: DomSanitizer,
              public dialog: MatDialog,
              private cdr: ChangeDetectorRef) {
    this.currentUserId = UserStoreService.getCurrentUser()._id;
  }

  public ngOnInit(): void {
    this.conversationService.getAll().subscribe(
      (conversations: Conversation[]) => {
        this.conversations = conversations;
      }
    );
  }

  public openCreateConversationDialog(): void {
    const dialogRef = this.dialog.open(CreateConversationDialogComponent);
    dialogRef.afterClosed().subscribe(
      (userId) => {
        if (userId) {
          const existConversation = this.conversations.find(conversation => conversation.users.includes(userId));
          if (existConversation) {
            this.openConversation(existConversation);
          } else {
            this.createConversation(userId);
          }
        }
      }
    );
  }

  private createConversation(userId: any): void {
    const userIds: any[] = [];
    userIds.push(userId);
    userIds.push(UserStoreService.getCurrentUser()._id);
    const conversation: CreateConversationDto = new CreateConversationDto();
    conversation.userIds = userIds;

    this.conversationService.create(conversation).subscribe(
      (savedConversation: Conversation) => {
        this.conversations = [... this.conversations, savedConversation];
        this.cdr.detectChanges();
      }
    );
  }

  public getSafeUrl(url: string): SafeStyle {
    return this.sanitizer.bypassSecurityTrustStyle(`url("${url}")`);
  }

  public openConversation(conversation: Conversation): void {
    this.currentConversation = conversation;
    this.messageService.getAllByConversationId(this.currentConversation._id).subscribe(
      (messages: MessageDto[]) => {
        this.messages = messages;
        this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
      }
    );
  }

  public sendMessage(): void {
    const messageText = this.messageFormGroup.controls.message.value;
    if (!messageText) {
      return;
    }
    const message: Message = new Message();
    message.text = this.messageFormGroup.controls.message.value;
    message.date = new Date();
    message.isRead = false;
    message.authorId = UserStoreService.getCurrentUser()._id;
    message.conversationId = this.currentConversation._id;
    this.messageService.send(message).subscribe(
      (savedMessage: MessageDto) => {
        this.messages = [... this.messages, savedMessage];
        this.messageFormGroup.controls.message.setValue(null);
        this.cdr.detectChanges();
        this.messagesElement.nativeElement.scrollTop = this.messagesElement.nativeElement.scrollHeight;
      }
    );
  }

}
