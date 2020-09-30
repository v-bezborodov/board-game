import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {PatternEditSidenavComponent} from './pattern-edit-sidenav.component';
import {PatternEditGeneralComponent} from './pattern-edit-general/pattern-edit-general.component';
import {PatternEditDeckComponent} from './pattern-edit-deck/pattern-edit-deck.component';
import {PatternEditDicesComponent} from './pattern-edit-dices/pattern-edit-dices.component';
import {PatternEditResourcesComponent} from './pattern-edit-resources/pattern-edit-resources.component';


const patternRoutes: Routes = [
  {
    path: 'pattern',
    component: PatternEditSidenavComponent,
    children: [
      {
        path: '',
        redirectTo: 'general',
        pathMatch: 'full'
      },
      {
        path: 'general',
        component: PatternEditGeneralComponent
      },
      {
        path: 'deck',
        component: PatternEditDeckComponent
      },
      {
        path: 'dices',
        component: PatternEditDicesComponent
      },
      {
        path: 'resources',
        component: PatternEditResourcesComponent
      }]
  }
];

@NgModule({
  imports: [RouterModule.forChild(patternRoutes)],
  exports: [RouterModule]
})
export class PatternEditSidenavRoutingModule { }
