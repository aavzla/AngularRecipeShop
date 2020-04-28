import { Component, OnInit } from '@angular/core';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];

  constructor() {
    this.recipes.push(new Recipe("A Test Recipe", "This is a test.", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"));
    this.recipes.push(new Recipe("A 2nd Test Recipe", "This is another test.", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"));
  }

  ngOnInit(): void {
  }

}
