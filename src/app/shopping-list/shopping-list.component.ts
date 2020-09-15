import { Component, OnInit, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';

import { Ingredient } from '../shared/ingredient.model';
import { ShoppingListService } from './shopping-list.service';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit, OnDestroy {
  ingredients: Ingredient[];
  private subcription: Subscription

  constructor(private shoppingListService: ShoppingListService) {
    //this.ingredients.push(new Ingredient("Apples", 5));
    //this.ingredients.push(new Ingredient("Tomatoes", 10));
  }

  ngOnInit(): void {
    this.ingredients = this.shoppingListService.getIngredients();
    this.subcription = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
      }
    );
  }

  /*
  onIngredientAdded(ingredient: Ingredient) {
    //console.log(this.constructor.name + ' we add to the array the ingredient ' + ingredient.name);
    this.ingredients.push(ingredient);
    //console.log(this.constructor.name + ' the elements contains in the array are ' + this.ingredients.length);
  }
  */

  onEditItem(index: number) {
    //We send the index of the ingredient wanted to be edited.
    this.shoppingListService.startedEditing.next(index);
  }

  ngOnDestroy(): void {
    this.subcription.unsubscribe();
  }
}
