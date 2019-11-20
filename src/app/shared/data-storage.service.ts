import { RecipeService } from './../recipes/recipe.service';
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class DataStorageService {
  constructor(private http: HttpClient,
              private recipeService: RecipeService) { }

  storeRecipes() {
    const recipes = this.recipeService.getRecipes();
    this.http.put('https://recipe-book-ccd5e.firebaseio.com/recipes.json', recipes)
      .subscribe(response => {
        console.log(response);
      });

  }

  fetchRecipes() {

  }
}