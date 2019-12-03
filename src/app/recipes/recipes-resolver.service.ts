import { RecipeService } from './recipe.service';
import { DataStorageService } from './../shared/data-storage.service';
import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Store } from '@ngrx/store';
import * as fromApp from '../store/app.reducer';
import * as RecipesActions from './store/recipe.actions';
import {Actions, ofType } from '@ngrx/effects';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RecipesResolverService implements Resolve<Recipe[]> {

  constructor(private dataStorageService: DataStorageService,
              private recipeService: RecipeService,
              private store: Store<fromApp.AppState>,
              private actions$: Actions) { }

  resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    const recipes = this.recipeService.getRecipes();

    if (recipes.length === 0) {
      // return this.dataStorageService.fetchRecipes();
      this.store.dispatch(new RecipesActions.FetchRecipes());
      return this.actions$.pipe(
        ofType(RecipesActions.SET_RECIPES),
        take(1)
      );

    } else {
      return recipes;
    }

  }

}
