import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {GameWindowComponent} from './game-window.component';
import {SocketIoConfig, SocketIoModule} from 'ngx-socket-io';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {MatButtonModule} from '@angular/material/button';

const config: SocketIoConfig = {
  url: `http://94.250.251.166:8081/${sessionStorage.getItem('roomId')}?userId=${sessionStorage.getItem('userId')}`,
  options: {}
};

@NgModule({
  declarations: [
    GameWindowComponent
  ],
    imports: [
        BrowserModule,
        BrowserAnimationsModule,
        SocketIoModule.forRoot(config),
        DragDropModule,
        MatButtonModule
    ]
})
export class GameWindowModule {
}
