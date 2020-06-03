import {
  Component,
  OnInit,
  //Input
} from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { ActivatedRoute, Params, Router } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  //@Input() recipeSelected: Recipe;
  recipeSelected: Recipe;
  id: number;

  constructor(
    private recipeService: RecipeService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        this.recipeSelected = this.recipeService.getRecipe(this.id);
      }
    );
  }

  onAddToShoppingList() {
    this.recipeService.addIngredientsToShoppingList(this.recipeSelected.ingredients);
  }

  onEditRecipe() {
    //Here, we don't need to pass the id, because it is already part of the existing URL,
    //and Angular will concat the existing URL with this new part added to the end of the URL.
    //So, it will work.
    this.router.navigate(['edit'], { relativeTo: this.route });

    //Here we will go up one level and then we add the id stored here and the word edit.
    //This will work also. This is for testing purposes.
    //this.router.navigate(['../', this.id, 'edit'], { relativeTo: this.route });
  }
}
