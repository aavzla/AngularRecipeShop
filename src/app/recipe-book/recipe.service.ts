import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipes: Recipe[] = [];
  recipeSelected: EventEmitter<Recipe>;

  constructor(private shoppingListService: ShoppingListService) {
    this.recipes.push(new Recipe(
      "Tasty Schnitzel",
      "A super-tasty Schnitzel - just awesome!",
      "https://upload.wikimedia.org/wikipedia/commons/7/72/Schnitzel.JPG",
      [
        new Ingredient('Meat', 1),
        new Ingredient('French Fries', 20)
      ]
    ));
    this.recipes.push(new Recipe(
      "Big Fat Burger",
      "What else you need to say?",
      "https://upload.wikimedia.org/wikipedia/commons/b/be/Burger_King_Angus_Bacon_%26_Cheese_Steak_Burger.jpg",
      [
        new Ingredient("Buns", 2),
        new Ingredient("Meat", 1)
      ]
    ));
    this.recipeSelected = new EventEmitter<Recipe>();
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
}
