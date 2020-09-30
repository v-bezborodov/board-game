import {BrowserModule} from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSidenavModule} from '@angular/material/sidenav';
import {PatternEditSidenavComponent} from './pattern-edit-sidenav.component';
import {PatternEditSidenavRoutingModule} from './pattern-edit-sidenav-routing.module';
import { PatternEditGeneralComponent } from './pattern-edit-general/pattern-edit-general.component';
import { PatternEditDicesComponent } from './pattern-edit-dices/pattern-edit-dices.component';
import { PatternEditResourcesComponent } from './pattern-edit-resources/pattern-edit-resources.component';
import { PatternEditDeckComponent } from './pattern-edit-deck/pattern-edit-deck.component';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatCheckboxModule} from '@angular/material/checkbox';
import {MatSelectModule} from '@angular/material/select';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { VideoDialogComponent } from './pattern-edit-deck/video-dialog/video-dialog.component';
import {MatDialogModule} from '@angular/material/dialog';


@NgModule({
  declarations: [
    PatternEditSidenavComponent,
    PatternEditGeneralComponent,
    PatternEditDicesComponent,
    PatternEditResourcesComponent,
    PatternEditDeckComponent,
    VideoDialogComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    PatternEditSidenavRoutingModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatCheckboxModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatDialogModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [PatternEditSidenavComponent]
})
export class PatternEditSidenavModule { }
