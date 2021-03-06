//import { EventEmitter } from '@angular/core';
import { Subject } from 'rxjs'

import { Ingredient } from '../shared/ingredient.model';

export class ShoppingListService {
  private ingredients: Ingredient[] = [];
  //This is the old way to communicate changes with the ingredients array.
  //ingredientsChanged: EventEmitter<Ingredient[]>;
  ingredientsChanged: Subject<Ingredient[]>;

  //This observable will track the edit of an ingredient.
  startedEditing: Subject<number>;

  constructor() {
    this.ingredients.push(new Ingredient("Apples", 5));
    this.ingredients.push(new Ingredient("Tomatoes", 10));
    //this.ingredientsChanged = new EventEmitter<Ingredient[]>();
    this.ingredientsChanged = new Subject<Ingredient[]>();
    this.startedEditing = new Subject<number>();
  }

  getIngredients() {
    //By using slice, we will return a new array with the same content that the ingredient list.
    //This will avoid to have any unwanted changes to the ingredient list.
    return this.ingredients.slice();
  }

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  addIngredient(ingredient: Ingredient) {
    this.addModifyIngredient(ingredient, false);
    //this.ingredientsChanged.emit(this.getIngredients());
    this.ingredientsChanged.next(this.getIngredients());
  }

  updateIngredient(ingredient: Ingredient) {
    this.addModifyIngredient(ingredient, true);
    this.ingredientsChanged.next(this.getIngredients());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.getIngredients());
  }

  private addModifyIngredient(ingredient: Ingredient, isUpdate: boolean) {
    let indexExistingIngredient = this.ingredients.findIndex(
      (ingredientInsideArray: Ingredient) => {
        return ingredientInsideArray.name.toLowerCase() === ingredient.name.trim().toLowerCase();
      });

    let hasIngredient = indexExistingIngredient !== -1;
    if (hasIngredient) {
      let amountModified: number;
      if (isUpdate) {
        amountModified = ingredient.amount;
      } else {
        amountModified = parseInt(this.ingredients[indexExistingIngredient].amount.toString()) + parseInt(ingredient.amount.toString());
      }
      //console.log('before ' + this.ingredients[indexExistingIngredient].amount);
      this.ingredients[indexExistingIngredient].amount = amountModified;
      //console.log('after ' + this.ingredients[indexExistingIngredient].amount);

      //Capitalize the first letter of the name all the time.
      this.ingredients[indexExistingIngredient].name = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
    }
    else {
      //Capitalize the first letter of the name all the time.
      ingredient.name = ingredient.name.charAt(0).toUpperCase() + ingredient.name.slice(1);
      this.ingredients.push(ingredient);
    }
  }

  addIngredients(ingredients: Ingredient[]) {
    for (let ingredient of ingredients) {
      this.addModifyIngredient(ingredient, false);
    }
    //this.ingredientsChanged.emit(this.getIngredients());
    this.ingredientsChanged.next(this.getIngredients());
  }
}
