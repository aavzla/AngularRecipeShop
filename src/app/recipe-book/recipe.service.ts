import { Recipe } from './recipe.model';

export class RecipeService {
  private recipes: Recipe[] = [];

  constructor() {
    this.recipes.push(new Recipe("A Test Recipe", "This is a test.", "https://cdn.pixabay.com/photo/2016/06/15/19/09/food-1459693_960_720.jpg"));
    this.recipes.push(new Recipe("A 2nd Test Recipe", "This is another test.", "https://upload.wikimedia.org/wikipedia/commons/3/39/Recipe.jpg"));
  }

  getRecipes() {
    //By using slice, we will return a new array with the same content that the recipes list.
    //This will avoid to have any unwanted changes to the recipe list.
    return this.recipes.slice();
  }
}
