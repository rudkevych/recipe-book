import { EventEmitter } from '@angular/core';
import { Recipe } from './recipe.model';

export class RecipeService {
    recipeSelected = new EventEmitter<Recipe>();

    private recipes: Recipe[] = [
        new Recipe('Test dwdwname', 'Test tefefetet',
          'https://www.bbcgoodfood.com/sites/default/files/recipe-collections/collection-image/2013/05/goulash.jpg'),
        new Recipe('Test dejdkehdjkee', 'Test desciption',
          'https://restexpert.ru/uploads/recipe/861/644x483/1527518787048785500.jpg')
      ];

      getRecipes() {
          // in order to return cope of recipes array, without ability to change the initial array
          return this.recipes.slice();
      }
}