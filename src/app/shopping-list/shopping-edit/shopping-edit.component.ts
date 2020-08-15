import {
  Component,
  OnInit,
  //ElementRef,
  //ViewChild,
  //Output,
  //EventEmitter
} from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';
import { ShoppingListService } from '../shopping-list.service';
import { NgForm } from '@angular/forms';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  //By implementing forms, we no longer need the local references by ViewChild
  //@ViewChild('nameInput') nameInput: ElementRef
  //@ViewChild('amountInput') amountInput: ElementRef;
  ingredient: Ingredient;
  //Using a Service in the recipe item, so no need to use property and event binding to communicate
  //@Output() ingredientEmitter: EventEmitter<Ingredient>;

  constructor(private shoppingListService: ShoppingListService) {
    //this.ingredientEmitter = new EventEmitter<Ingredient>();
  }

  ngOnInit(): void {
  }

  onAddIngredient(form: NgForm) {
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
    this.shoppingListService.addIngredient(this.ingredient);
  }
}
