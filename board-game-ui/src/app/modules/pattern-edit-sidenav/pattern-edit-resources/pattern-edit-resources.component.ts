import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormControl, FormGroup, Validators} from '@angular/forms';
import {Resource} from '../../../models/resource.model';
import {ResourceStoreService} from '../../../services/stores/resource-store.service';
import {uuid} from 'uuidv4';
import {FileService} from '../../../services/file.service';
import {StoreEventService} from '../../../services/stores/store-event.service';
import {environment} from '../../../../environments/environment';

@Component({
  selector: 'app-pattern-edit-resources',
  templateUrl: './pattern-edit-resources.component.html',
  styleUrls: ['./pattern-edit-resources.component.scss']
})
export class PatternEditResourcesComponent implements OnInit, OnDestroy {

  resources: Resource[] = [];

  selectedResource: Resource;

  resourceForm = new FormGroup({
    name: new FormControl('', Validators.required),
    avatar: new FormControl(),
    value: new FormControl('', Validators.required),
    maxValue: new FormControl(),
    minValue: new FormControl()
  });

  constructor(private storeEventService: StoreEventService,
              private fileService: FileService) { }

  ngOnInit(): void {
    this.resources = ResourceStoreService.getResources();
    ResourceStoreService.subscription.subscribe(() => {
      const resource = this.getDefaultResource();
      this.resources = [...this.resources, resource];
      this.getResourceFromForm();
      this.setResourceIntoForm(resource._id);
    });

    this.storeEventService.subscription.subscribe(() => {
      this.ngOnDestroy();
    });
  }

  getResourceFromForm() {
    if (this.selectedResource !== undefined) {
      const newResource: Resource = this.selectedResource;
      if (newResource._id == null) {
        newResource._id = uuid();
      }
      newResource.name = this.resourceForm.controls.name.value;
      newResource.value = this.resourceForm.controls.value.value;
      newResource.maxValue = this.resourceForm.controls.maxValue.value;
      newResource.minValue = this.resourceForm.controls.minValue.value;

      const previousResource = this.resources.find(dice => dice._id === newResource._id);
      const index = this.resources.indexOf(previousResource);
      this.resources[index] = newResource;
    }
  }

  setResourceIntoForm(id: string) {
    this.getResourceFromForm();
    this.selectedResource = this.resources.find(resource => resource._id === id);

    this.resourceForm.controls.name.setValue(this.selectedResource.name);
    this.resourceForm.controls.value.setValue(this.selectedResource.value);
    this.resourceForm.controls.maxValue.setValue(this.selectedResource.minValue);
    this.resourceForm.controls.minValue.setValue(this.selectedResource.minValue);
  }

  deleteResource(id: string) {
    this.resources = this.resources.filter(dice => {
      if (dice._id !== id) {
        return dice;
      }
    });
    if (this.resources.length === 0) {
      this.selectedResource = undefined;
    }
  }

  uploadFile(file: any): void {
    const image = file.target.files[0];
    const formdata = new FormData();
    formdata.append('file', image);
    this.fileService.upload(formdata).subscribe(imageUrl => {
      this.selectedResource.avatarUrl = `${environment.staticUrl}/static/${imageUrl.path}`;
    });
  }

  getDefaultResource(): Resource {
    const resource: Resource = new Resource();
    resource._id = uuid();
    resource.name = 'Новый ресурс';
    return resource;
  }

  ngOnDestroy(): void {
    this.getResourceFromForm();
    ResourceStoreService.setResources(this.resources);
  }

}
