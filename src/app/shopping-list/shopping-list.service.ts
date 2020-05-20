import { Ingredient } from '../shared/ingredient.model';
import { EventEmitter } from '@angular/core';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  ingredientsChanged: EventEmitter<Ingredient[]>;

  constructor() {
    this.ingredients.push(new Ingredient("Apples", 5));
    this.ingredients.push(new Ingredient("Tomatoes", 10));
    this.ingredientsChanged = new EventEmitter<Ingredient[]>();
  }

  getIngredients() {
    //By using slice, we will return a new array with the same content that the ingredient list.
    //This will avoid to have any unwanted changes to the ingredient list.
    return this.ingredients.slice();
  }

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.ingredientsChanged.emit(this.getIngredients());
  }
}
