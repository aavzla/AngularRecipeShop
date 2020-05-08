import { Component, OnInit, ElementRef, ViewChild, Output, EventEmitter } from '@angular/core';
import { Ingredient } from '../../shared/ingredient.model';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
  @ViewChild('nameInput') nameInput: ElementRef
  @ViewChild('amountInput') amountInput: ElementRef;
  ingredient: Ingredient;
  @Output() ingredientEmitter: EventEmitter<Ingredient>;

  constructor() {
    this.ingredientEmitter = new EventEmitter<Ingredient>();
  }

  ngOnInit(): void {
  }

  onAddIngredient() {
    //console.log(this.constructor.name + ' this is the name input value ' + this.nameInput.nativeElement.value);
    //console.log(this.constructor.name + ' this is the amount input value ' + this.amountInput.nativeElement.value);
    this.ingredient = new Ingredient(
      this.nameInput.nativeElement.value,
      this.amountInput.nativeElement.value
    );
    this.ingredientEmitter.emit(this.ingredient);
  }
}
