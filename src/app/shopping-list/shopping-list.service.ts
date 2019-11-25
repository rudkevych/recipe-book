import { Subject } from 'rxjs';
import {Ingredient} from './../shared/ingredient.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ShoppingListService {
  startedEditing = new Subject<number>();
  ingredientsChanged = new Subject<Ingredient[]>();

  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 3)
  ];

  getIngredient(index: number): Ingredient {
    return this.ingredients[index];
  }

  getIngredients(): Ingredient[] {
    return this.ingredients;
  }

  addNewIngredients(newIngredients: Ingredient[]) {
    this.ingredients.push(...newIngredients);
  }

  addNewIngredient(ingredient: Ingredient) {
      this.ingredients.push(ingredient);
      this.ingredientsChanged.next(this.ingredients.slice());
  }

  updateIngredient(index: number, newIngredient: Ingredient) {
    this.ingredients[index] = newIngredient;
    this.ingredientsChanged.next(this.ingredients.slice());
  }

  deleteIngredient(index: number) {
    this.ingredients.splice(index, 1);
    this.ingredientsChanged.next(this.ingredients.slice());
  }

}
