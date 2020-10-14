import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { RecipeService } from '../recipe-book/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        'https://recipeshop-99a3f.firebaseio.com/recipes.json',
        recipes
      )
      .subscribe(response => {
        console.log(this.constructor.name + ' -  Saved recipes.', response);
      });
  }
}
