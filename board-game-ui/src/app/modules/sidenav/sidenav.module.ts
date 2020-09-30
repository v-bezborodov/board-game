import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {SidenavComponent} from './sidenav.component';
import {SidenavRoutingModule} from './sidenav-routing.module';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatIconModule} from '@angular/material/icon';
import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatListModule} from '@angular/material/list';
import { GamesComponent } from './games/games.component';
import { GamePatternComponent } from './game-pattern/game-pattern.component';
import { SubscriptionComponent } from './subscription/subscription.component';
import { HelpPageComponent } from './help-page/help-page.component';
import { ProfileComponent } from './profile/profile.component';
import {MatCardModule} from '@angular/material/card';
import {MatFormFieldModule} from '@angular/material/form-field';
import {ReactiveFormsModule} from '@angular/forms';
import {MatInputModule} from '@angular/material/input';
import { CreateGameDialogComponent } from './games/create-game-dialog/create-game-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';
import {MatTableModule} from '@angular/material/table';
import {MatMenuModule} from '@angular/material/menu';
import { CreateGamePatternDialogComponent } from './game-pattern/create-game-pattern-dialog/create-game-pattern-dialog.component';
import { CopyGamePatternDialogComponent } from './game-pattern/copy-game-pattern-dialog/copy-game-pattern-dialog.component';
import { DeleteGamePatternDialogComponent } from './game-pattern/delete-game-pattern-dialog/delete-game-pattern-dialog.component';
import {MatSelectModule} from '@angular/material/select';
import {MatExpansionModule} from '@angular/material/expansion';
import {RequestsComponent} from './requests/requests.component';
import { GamesCalendarComponent } from './games-schedule/games-calendar.component';
import {MatDatepickerModule} from '@angular/material/datepicker';
import {MatNativeDateModule} from '@angular/material/core';
import { PractitionerProfileComponent } from './practitioner-profile/practitioner-profile.component';
import { GameProfileComponent } from './game-profile/game-profile.component';
import { ConversationListComponent } from './conversation-list/conversation-list.component';
import { CreateConversationDialogComponent } from './conversation-list/create-conversation-dialog/create-conversation-dialog.component';


@NgModule({
  declarations: [
    SidenavComponent,
    GamesComponent,
    GamePatternComponent,
    SubscriptionComponent,
    HelpPageComponent,
    ProfileComponent,
    CreateGameDialogComponent,
    CreateGamePatternDialogComponent,
    CopyGamePatternDialogComponent,
    DeleteGamePatternDialogComponent,
    RequestsComponent,
    GamesCalendarComponent,
    PractitionerProfileComponent,
    GameProfileComponent,
    ConversationListComponent,
    CreateConversationDialogComponent
  ],
  imports: [
    BrowserModule,
    SidenavRoutingModule,
    BrowserAnimationsModule,
    MatSidenavModule,
    MatIconModule,
    MatButtonModule,
    MatToolbarModule,
    MatListModule,
    MatCardModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MatDialogModule,
    MatTableModule,
    MatMenuModule,
    MatSelectModule,
    MatExpansionModule,
    MatDatepickerModule,
    MatNativeDateModule
  ],
  providers: [],
  bootstrap: [SidenavComponent]
})
export class SidenavModule { }
