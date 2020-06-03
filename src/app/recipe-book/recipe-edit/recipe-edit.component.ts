import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean = false;

  constructor(private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        //console.log(this.constructor.name + ' - id stored value is ' + this.id);
        //console.log(this.constructor.name + ' - editMode stored value is ' + this.editMode);
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.id = +params['id'];
        }
        //console.log(this.constructor.name + ' - editMode value is ' + this.editMode);
        //console.log(this.constructor.name + ' - id value is ' + this.id);
      }
    );
  }

}
