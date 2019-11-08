import { ShoppingListService } from './../../shopping-list/shopping-list.service';
import { RecipeService } from './../recipe.service';
import { Recipe } from './../recipe.model';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
  @Input() selectedRecipe: Recipe;

  constructor(private shoppingListService: ShoppingListService) {
   }

  ngOnInit() {
  }

  onToListAdded() {
    this.shoppingListService.addNewIngredients(this.selectedRecipe.ingredients);
  }
  
}
