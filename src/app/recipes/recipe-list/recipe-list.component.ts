import { RecipeService } from './../recipe.service';
import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import {Recipe} from '../recipe.model';
import {ActivatedRoute, Route, Router} from '@angular/router';

@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit {
  recipes: Recipe[];

  constructor(private recipeService: RecipeService,
              private router: Router,
              private route: ActivatedRoute) { }

  ngOnInit() {
    this.recipeService.recipesChanged.subscribe(
      (recipes: Recipe[]) => {
          this.recipes = recipes;
      }
    )
    this.recipes = this.recipeService.getRecipes();
  }

  onRecipeSelected(id: number) {
    this.recipeService.selectedRecipeId = id;
    this.router.navigate([`/recipes/${id}`]);
  }

  onNewRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
