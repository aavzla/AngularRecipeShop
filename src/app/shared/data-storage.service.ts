import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Recipe } from '../recipe-book/recipe.model';
import { RecipeService } from '../recipe-book/recipe.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private recipesURL: string;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService
  ) {
    this.recipesURL = 'https://recipeshop-99a3f.firebaseio.com/recipes.json';
  }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http
      .put(
        this.recipesURL,
        recipes
      )
      .subscribe(response => {
        //console.log(this.constructor.name + ' -  Saved recipes.', response);
        alert('The recipes are saved');
      });
  }

  fetchRecipes() {
    this.http
      .get<Recipe[]>(
        this.recipesURL
      )
      .subscribe(recipes => {
        //console.log(this.constructor.name + ' - Fetch recipes.', recipes);
        this.recipeService.setRecipes(recipes ?? []);
      })
  }
}
