import {
  Component,
  OnInit,
  Input,
  //EventEmitter,
  //Output
} from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {
  @Input() recipe: Recipe;
  //V1 - We have an void emitter and the element selected is handled by the recipe list component
  //@Output() recipeEmitter: EventEmitter<void>;
  //V2 - We have an Recipe emitter and the element selected is handled by this component
 // @Output() recipeEmitter: EventEmitter<Recipe>;

  //V3
  //Inject the service into the component
  constructor(private recipeService: RecipeService) {
    //V1
    //this.recipeEmitter = new EventEmitter<void>();
    //V2
    //this.recipeEmitter = new EventEmitter<Recipe>();
  }

  ngOnInit(): void {
  }

  onSelectedRecipe() {
    //V1
    //console.log(this.constructor.name + ' a recipe was selected');
    //this.recipeEmitter.emit();
    //V2
    //console.log(this.constructor.name + ' The selected recipe is ' + this.recipe.name);
    //this.recipeEmitter.emit(this.recipe);

    //V3
    //Using a service
    this.recipeService.recipeSelected.emit(this.recipe);
  }
}
