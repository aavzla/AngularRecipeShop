import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray, Validators } from '@angular/forms';

import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {
  id: number;
  editMode: boolean;

  //The recipe Form container to have access to the form.
  recipeForm: FormGroup

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService) {
    this.editMode = false;
  }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        //console.log(this.constructor.name + ' - id stored value is ' + this.id);
        //console.log(this.constructor.name + ' - editMode stored value is ' + this.editMode);
        this.editMode = params['id'] != null;
        if (this.editMode) {
          this.id = +params['id'];
        }
        //console.log(this.constructor.name + ' - editMode value is ' + this.editMode);
        //console.log(this.constructor.name + ' - id value is ' + this.id);
        this.initForm();
        //console.log(this.constructor.name + ' - the recipe name is ' + (this.recipeForm.value.name === '' ? 'empty' : this.recipeForm.value.name));
        //console.log(this.constructor.name + ' - the recipe description is ' + (this.recipeForm.value.description === '' ? 'empty' : this.recipeForm.value.description));
        //console.log(this.constructor.name + ' - the recipe imagePath is ' + (this.recipeForm.value.imagePath === '' ? 'empty' : this.recipeForm.value.imagePath));
      }
    );
  }

  private initForm() {
    let recipeName = '';
    let recipeDescription = '';
    let recipeImagePath = '';
    let recipeIngredients = new FormArray([]);

    if (this.editMode) {
      const recipe = this.recipeService.getRecipe(this.id);
      recipeName = recipe.name;
      recipeDescription = recipe.description;
      recipeImagePath = recipe.imagePath;
      //Other way to check if we have ingredients in the recipe at the if condition is: recipe['ingredients']
      //The result should be defined or not and therefore translated to true or false.
      if (recipe.ingredients.length > 0) {
        for (let ingredient of recipe.ingredients) {
          //Add the ingredients name and amount to FormControls inside a FormGroup and this into the FormArray, so we can use it at the view.
          recipeIngredients.push(new FormGroup({
            name: new FormControl(ingredient.name, Validators.required),
            //To add a pattern as a validator, It must be between forward slashes '/'
            amount: new FormControl(ingredient.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      ingredients: recipeIngredients
    });
  }

  //This method will allow to get the controls of the ingredients collection in the view.
  //Check the ngFor in the ingredients HTML code.
  get ingredientsControls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  //This method allow us to add the FormGroup with controls required to add an empty ingredient to the recipe.
  //On the submit, the empty ingredient will be filled with the proper values as it has validations to avoid empty ingredient.
  onAddIngredient() {
    (<FormArray>this.recipeForm.get('ingredients')).push(new FormGroup({
      name: new FormControl(null, Validators.required),
      amount: new FormControl(null, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
    }));
  }

  onSubmit() {
    //console.log(this.constructor.name + ' - this is the form submitted.', this.recipeForm);

    //The new recipe that we are building to add or modify has the same structure, properties names and formats that are required
    // to send to the service (check the newRecipe parameters, all starts with this.recipeForm.value), therefore we can use the same object in the form
    // to send to the service (this.recipeForm.value), instead of create a local variable with the same info.
    //The only downside is that the objects will not be strong typed as it was before.

    //console.log(this.constructor.name + ' - this is the ingredient in form received.', this.recipeForm.value.ingredients);

    //Creating the ingredientsArray for the newRecipe ingredients parameter.
    let ingredientsInForm = this.recipeForm.value.ingredients;
    let ingredientsArray = new Array();
    for (let ing of ingredientsInForm) {
      ingredientsArray.push(new Ingredient(ing.name, ing.amount));
    }
    //console.log(this.constructor.name + ' - this is the ingredient array Built.', ingredientsArray);

    //Creating the new Recipe (strongTyped)
    const newRecipe = new Recipe(
      this.recipeForm.value.name,
      this.recipeForm.value.description,
      this.recipeForm.value.imagePath,
      ingredientsArray
    );
    //console.log(this.constructor.name + ' - this is the recipe Built.', newRecipe);

    if (this.editMode) {
      this.recipeService.updateRecipe(
        this.id,
        //This is the case to send the same object on the form (not strongtyped)
        //this.recipeForm.value
        //This is the case we cast the values to a strong typed object.
        newRecipe
      )
    } else {
      this.recipeService.addRecipe(
        //This is the case to send the same object on the form (not strongtyped)
        //this.recipeForm.value
        //This is the case we cast the values to a strong typed object.
        newRecipe
      );
    }
    //console.log(this.constructor.name + ' - this is the recipes after submit.', this.recipeService.getRecipes());
  }
}
