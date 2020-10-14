import {
  Component,
  //Output,
  //EventEmitter
} from "@angular/core";

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  collapsed: boolean;
  //@Output() featureSelected: EventEmitter<string>;

  constructor(
    private dataStorageService: DataStorageService
  ) {
    this.collapsed = true;
    //this.featureSelected = new EventEmitter<string>();
  }
  /*
  onSelect(feature: string) {
    //console.log('The value of feature is ' + feature);
    this.featureSelected.emit(feature);
  }
  */

  onSaveData() {
    this.dataStorageService.storeRecipes();
  }
}
