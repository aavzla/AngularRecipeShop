import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import {
  map,
  tap,
  take,
  exhaustMap
} from 'rxjs/operators';

import { Recipe } from '../recipe-book/recipe.model';
import { RecipeService } from '../recipe-book/recipe.service';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  private recipesURL: string;

  constructor(
    private http: HttpClient,
    private recipeService: RecipeService,
    private authService: AuthService
  ) {
    this.recipesURL = 'https://recipeshop-aabb0-default-rtdb.firebaseio.com/recipes.json';
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
        //alert('The recipes are saved');
      });
  }

  fetchRecipes() {

    return this.http
      .get<Recipe[]>(
        this.recipesURL
      )
      .pipe(
        map(recipes => {
          return recipes.map(recipe => {
            return {
              ...recipe,
              ingredients: recipe.ingredients ?? []
            };
          });
        }),
        tap(recipes => {
          //The setting of the recipes is done in the tap to execute the code without altering the stream of data.
          //console.log(this.constructor.name + ' - Fetch recipes.', recipes);
          this.recipeService.setRecipes(recipes ?? []);
        })
      )

    //The fetchRecipes will return an Observable as before, but the subscription will be done differently.
    //The subscribe will be done at the calling code place.
    //This was also done, so the resolver will have the observable and Angular could subscribe automaticaly under the hood.
    //.subscribe(recipes => {
    //})
  }
}
