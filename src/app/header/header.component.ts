import {
  Component,
  //Output,
  //EventEmitter
} from "@angular/core";

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html'
})

export class HeaderComponent {
  collapsed: boolean;
  //@Output() featureSelected: EventEmitter<string>;

  constructor() {
    this.collapsed = true;
    //this.featureSelected = new EventEmitter<string>();
  }
  /*
  onSelect(feature: string) {
    //console.log('The value of feature is ' + feature);
    this.featureSelected.emit(feature);
  }
  */
}
