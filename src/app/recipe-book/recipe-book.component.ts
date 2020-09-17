import { Component, OnInit } from '@angular/core';
//import { Recipe } from './recipe.model';
//import { RecipeService } from './recipe.service';

@Component({
  selector: 'app-recipe-book',
  templateUrl: './recipe-book.component.html',
  styleUrls: ['./recipe-book.component.css']
})
export class RecipeBookComponent implements OnInit {
  //recipeSelected: Recipe;

  constructor(
    //private recipeService: RecipeService
  ) { }

  ngOnInit(): void {
    //this.recipeService.recipeSelected.subscribe(
    //  (recipe: Recipe) => {
    //    this.recipeSelected = recipe;
    //  }
    //);
  }

  /*
  onRecipeSelected(recipe: Recipe) {
    //console.log(this.constructor.name + ' has received the selected recipe ' + recipe.name);
    this.recipeSelected = recipe;
  }
  */
}
