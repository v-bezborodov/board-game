import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {Resource} from '../../models/resource.model';

@Injectable({
  providedIn: 'root'
})
export class ResourceStoreService {

  static _subscription = new Subject<void>();
  static resources: Resource[] = [];

  static get subscription() {
    return this._subscription;
  }

  static addResource() {
    this._subscription.next();
  }

  static getResources(): Resource[] {
    return this.resources;
  }

  static setResources(resources: Resource[]) {
    this.resources = resources;
  }

}
