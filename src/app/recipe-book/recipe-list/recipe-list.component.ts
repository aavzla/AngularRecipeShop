import {
  Component,
  OnInit,
  //Output,
  //EventEmitter
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[] = [];
  //V3 - Using a Service in the recipe item, so no need to use property and event binding to communicate
  //recipeSelected: Recipe;
  //@Output() recipeSelectedEmitter: EventEmitter<Recipe>;

  constructor(private recipeService: RecipeService) {
    //this.recipeSelectedEmitter = new EventEmitter<Recipe>();
    //this.recipes.push(new Recipe("A Test Recipe", "This is a test.", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"));
    //this.recipes.push(new Recipe("A 2nd Test Recipe", "This is another test.", "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg"));
  }

  ngOnInit(): void {
    this.recipes = this.recipeService.getRecipes();
  }

  /*
  onRecipeSelected(recipeSelected: Recipe) {
    //console.log(this.constructor.name + ' has received the selected recipe ' + recipeSelected.name);
    this.recipeSelected = recipeSelected;
    this.recipeSelectedEmitter.emit(this.recipeSelected);

  }
  */
}
