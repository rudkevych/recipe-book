import { Ingredient } from './../shared/ingredient.model';
import {Component, OnInit} from '@angular/core';

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrls: ['./shopping-list.component.css']
})
export class ShoppingListComponent implements OnInit {
  ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Bananas', 3)
  ];

  constructor() {
  }

  ngOnInit() {
  }

  onIngredientAdded(ingredient: Ingredient) {
    const newIngredient = new Ingredient(ingredient.name, ingredient.amount);
    this.ingredients.push(newIngredient);
    console.log(this.ingredients);
  }
}
