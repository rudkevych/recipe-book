import { Recipe } from './../recipe.model';
import { Action } from '@ngrx/store';

export const SET_RECIPES = '[Recipes] Set Recipes';
export const GET_RECIPE = '[Recipes] Get Recipe';
export const FETCH_RECIPES = '[Recipes] Fetch Recipes';

export class SetRecipes implements Action {
  readonly type = SET_RECIPES;

  constructor(public payload: Recipe[]) {}
}

export class GetRecipe implements Action {
  readonly type = GET_RECIPE;

  constructor(public payload: number) {}
}

export class FetchRecipes implements Action {
  readonly type = FETCH_RECIPES;
}

export type RecipesActions = SetRecipes | GetRecipe | FetchRecipes;

