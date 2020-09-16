import {
  Component,
  OnInit,
  OnDestroy,
  //ElementRef,
  ViewChild,
  //Output,
  //EventEmitter
} from '@angular/core';
import { NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit, OnDestroy {
  //By implementing forms, we no longer need the local references by ViewChild
  //@ViewChild('nameInput') nameInput: ElementRef
  //@ViewChild('amountInput') amountInput: ElementRef;
  ingredient: Ingredient;
  //Using a Service in the recipe item, so no need to use property and event binding to communicate
  //@Output() ingredientEmitter: EventEmitter<Ingredient>;

  //Get access to the form
  @ViewChild('f', { static: false }) form: NgForm

  //Local variable to access the subscription of the startedEditing.
  subscription: Subscription
  //Tracks if the access to this component is for edit or create.
  editMode: boolean;
  //Local access to the edit item index.
  editedItemIndex: number;
  //Local access to the edited item.
  editedItem: Ingredient

  constructor(private shoppingListService: ShoppingListService) {
    //this.ingredientEmitter = new EventEmitter<Ingredient>();
    this.editMode = false;
    //console.log(this.constructor.name + ' Is an edit mode? ' + this.editMode);
  }

  ngOnInit(): void {
    //Here, we subscribe to listen to any changes at the index wanted to be edited.
    this.subscription = this.shoppingListService.startedEditing.subscribe(
      (index: number) => {
        this.editMode = true;
        this.editedItemIndex = index;
        //console.log(this.constructor.name + ' The edit item index received is ' + this.editedItemIndex);
        //console.log(this.constructor.name + ' Is an edit mode? ' + this.editMode);
        this.editedItem = this.shoppingListService.getIngredient(this.editedItemIndex);
        //load the values to the input field to display the selected item.
        this.form.setValue({
          name: this.editedItem.name,
          amount: this.editedItem.amount
        });
      }
    );
  }

  //The method was renamed from onAddIngredient to onSubmit to include the update action.
  onSubmit(form: NgForm) {
    //console.log(this.constructor.name + ' this is the name input value ' + this.nameInput.nativeElement.value);
    //console.log(this.constructor.name + ' this is the amount input value ' + this.amountInput.nativeElement.value);
    this.ingredient = new Ingredient(
      //By implementing forms, we no longer need the local references by ViewChild
      //this.nameInput.nativeElement.value,
      //this.amountInput.nativeElement.value

      //By receiving the form as a parameter, we can have access to the inputs.
      form.value.name,
      form.value.amount
    );
    //this.ingredientEmitter.emit(this.ingredient);
    if (this.editMode) {
      this.shoppingListService.updateIngredient(this.ingredient);
    } else {
      this.shoppingListService.addIngredient(this.ingredient);
    }

    this.onResetForm();
  }

  onClear() {
    this.onResetForm();
  }

  private onResetForm() {
    //Reset the mode and the fields after a submit of the form
    this.editMode = false;
    this.form.reset();
  }

  onDelete() {
    this.shoppingListService.deleteIngredient(this.editedItemIndex);
    this.onResetForm();
  }

  ngOnDestroy() {
    //We unsubscribe to avoid any memory leak and keep it clean.
    this.subscription.unsubscribe();
  }
}
