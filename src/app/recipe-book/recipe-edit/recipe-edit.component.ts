import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { FormGroup, FormControl, FormArray } from '@angular/forms';

import { RecipeService } from '../recipe.service';

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
            name: new FormControl(ingredient.name),
            amount: new FormControl(ingredient.amount)
          }));
        }
      }
    }

    this.recipeForm = new FormGroup({
      name : new FormControl(recipeName),
      description : new FormControl(recipeDescription),
      imagePath: new FormControl(recipeImagePath),
      ingredients: recipeIngredients
    });
  }

  //This method will allow to get the controls of the ingredients collection in the view.
  //Check the ngFor in the ingredients HTML code.
  get controls() {
    return (<FormArray>this.recipeForm.get('ingredients')).controls;
  }

  //This method allow us to add the FormGroup with controls required to later add ingredients to the recipe.
  onAddIngredient() {
    this.controls.push(new FormGroup({
      name: new FormControl(),
      amount: new FormControl()
    }));
  }

  onSubmit() {
    console.log(this.constructor.name + ' - this is the form submitted.', this.recipeForm);
  }
}
