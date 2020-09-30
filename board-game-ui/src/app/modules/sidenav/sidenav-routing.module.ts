import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {SidenavComponent} from './sidenav.component';
import {GamesComponent} from './games/games.component';
import {GamePatternComponent} from './game-pattern/game-pattern.component';
import {ProfileComponent} from './profile/profile.component';
import {HelpPageComponent} from './help-page/help-page.component';
import {SubscriptionComponent} from './subscription/subscription.component';
import {RequestsComponent} from './requests/requests.component';
import {GamesCalendarComponent} from './games-schedule/games-calendar.component';
import {PractitionerProfileComponent} from './practitioner-profile/practitioner-profile.component';
import {GameProfileComponent} from './game-profile/game-profile.component';
import {ConversationListComponent} from './conversation-list/conversation-list.component';


const boardGameRoutes: Routes = [
  {
    path: 'board-games',
    component: SidenavComponent,
    children: [
      {
        path: 'games',
        component: GamesComponent
      },
      {
        path: 'requests',
        component: RequestsComponent
      },
      {
        path: 'patterns',
        component: GamePatternComponent
      },
      {
        path: 'profile',
        component: ProfileComponent
      },
      {
        path: 'subscription',
        component: SubscriptionComponent
      },
      {
        path: 'help',
        component: HelpPageComponent
      },
      {
        path: 'calendar',
        component: GamesCalendarComponent
      },
      {
        path: 'practitioner/:id',
        component: PractitionerProfileComponent
      },
      {
        path: 'game/:id',
        component: GameProfileComponent
      },
      {
        path: 'conversations',
        component: ConversationListComponent
      }
    ]
  },

];

@NgModule({
  imports: [RouterModule.forChild(boardGameRoutes)],
  exports: [RouterModule]
})
export class SidenavRoutingModule { }
