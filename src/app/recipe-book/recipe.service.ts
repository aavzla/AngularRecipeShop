import {
  //EventEmitter,
  Injectable
} from '@angular/core';
import { Subject } from 'rxjs';

import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  recipesChange: Subject<Recipe[]>;

  private recipes: Recipe[] = [];
  //This is the old way to communicate changes with the recipes array before routing.
  //recipeSelected: EventEmitter<Recipe>;

  constructor(private shoppingListService: ShoppingListService) {
    this.recipesChange = new Subject<Recipe[]>();

    //Uncomment the recipes push in order to have some data loaded into the recipes (not from DB).
    //this.recipes.push(new Recipe(
    //  "Tasty Schnitzel",
    //  "A super-tasty Schnitzel - just awesome!",
    //  "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
    //  [
    //    new Ingredient('Meat', 1),
    //    new Ingredient('French Fries', 20)
    //  ]
    //));
    //this.recipes.push(new Recipe(
    //  "Big Fat Burger",
    //  "What else you need to say?",
    //  "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
    //  [
    //    new Ingredient("Buns", 2),
    //    new Ingredient("Meat", 1)
    //  ]
    //));

    //this.recipeSelected = new EventEmitter<Recipe>();
  }

  setRecipes(recipes: Recipe[]) {
    //This will replace the recipes in the array by the recipes received in the argument.
    //console.log(this.constructor.name + ' - Set Recipes.', recipes);
    this.recipes = recipes;
    this.recipesChange.next(this.getRecipes());
  }

  getRecipes() {
    //By using slice, we will return a new array with the same content that the recipes list.
    //This will avoid to have any unwanted changes to the recipe list.
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    //This is if we implement the slice to get a copy and not the original item. But, also it won't be a deep copy.
    //return this.recipes.slice()[id];

    return this.recipes[id];
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]) {
    this.shoppingListService.addIngredients(ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChange.next(this.getRecipes());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChange.next(this.getRecipes());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChange.next(this.getRecipes());
  }
}
