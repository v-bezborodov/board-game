import {Injectable} from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DialogService {

  static getDialogWindowWidth(): string {
    const screenWidth = Number (window.screen.width);
    if (screenWidth > 2000) {
      return '250px';
    }

    if (screenWidth > 1080 && screenWidth < 2000) {
      return '25%';
    }

    if (screenWidth < 1080 && screenWidth > 580) {
      return '50%';
    }

    return '95%';
  }

}
