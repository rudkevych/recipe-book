import { EventEmitter, Injectable } from '@angular/core';
import { Recipe } from './recipe.model';
import { Ingredient } from '../shared/ingredient.model';
import {Subject} from 'rxjs';

@Injectable()
export class RecipeService {
  recipeSelected = new Subject<Recipe>();
  recipesChanged = new Subject<Recipe[]>();
  selectedRecipeId: number;

  private recipes: Recipe[] = [
    new Recipe(
      'Meat with potato',
      'Test tefefetet',
      'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/goulash.jpg',
      [
        new Ingredient('Meat', 1),
        new Ingredient('Potato', 10)
      ]),
    new Recipe(
      'Tost with tomato',
      'Test desciption',
      'https://restexpert.ru/uploads/recipe/861/644x483/1527518787048785500.jpg',
      [
        new Ingredient('Tomato', 4),
        new Ingredient('Eggs', 2),
        new Ingredient('bread', 1)
      ])
  ];

  getRecipes() {
    // in order to return cope of recipes array, without ability to change the initial array
    return this.recipes.slice();
  }

  getRecipe(id: number) {
    return this.recipes[id];
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.recipes.slice());
  }

  updateRecipe(index: number, newRecipe: Recipe) {
    this.recipes[index] = newRecipe;
    this.recipesChanged.next(this.recipes.slice());
  }

  deleteRecipe(index: number) {
    this.recipes.splice(index, 1);
    this.recipesChanged.next(this.recipes.slice());
  }

}
