import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as ShoppingListActions from '../../shopping-list/store/shopping-list.actions';
import * as fromApp from '../../store/app.reducer';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { map, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  recipe: Recipe;
  id: any;

  constructor(private route: ActivatedRoute,
              private recipeService: RecipeService,
              private router: Router,
              private store: Store<fromApp.AppState>) {
  }

  ngOnInit() {
    this.route.params.pipe(map(params => {
      console.log('params', params);
      return +params[`id`];
    }),
      switchMap(id => {
        console.log('id', id);
        this.id = id;
        return this.store.select('recipes')
          .pipe(map(
            recipesState => {
              return recipesState.recipes.find((recipe, index) => {
                return index === this.id;
              });
            }));
      })).subscribe(recipe => {
        console.log(recipe);
        this.recipe = recipe;
      });
  }

  onToListAdded() {
    // this.shoppingListService.addNewIngredients(this.recipe.ingredients);
    console.log(this.recipe.ingredients);

    this.store.dispatch(new ShoppingListActions.AddIngredients(this.recipe.ingredients));
  }

  onEditRecipe() {
    this.router.navigate(['edit'], { relativeTo: this.route });
  }

  onDelete() {
    this.recipeService.deleteRecipe(this.id);
    this.router.navigate(['../'], { relativeTo: this.route });
  }

}
