import {
  Component,
  OnInit,
  //Output,
  //EventEmitter
} from "@angular/core";

import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit {
  collapsed: boolean;
  //@Output() featureSelected: EventEmitter<string>;

  constructor(
    private dataStorageService: DataStorageService
  ) {
    this.collapsed = true;
    //this.featureSelected = new EventEmitter<string>();
  }

  ngOnInit(): void {
    //Comment on the line below to avoid the load of the recipes automatically.
    this.dataStorageService.fetchRecipes().subscribe();
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

  onFetchData() {
    this.dataStorageService.fetchRecipes().subscribe();
    alert('The recipes are loaded');
  }
}
