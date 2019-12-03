import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormArray, FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import * as fromApp from '../../store/app.reducer';
import { DataStorageService } from './../../shared/data-storage.service';
import { Recipe } from './../recipe.model';
import { RecipeService } from './../recipe.service';
import { map } from 'rxjs/operators';
import * as RecipeActions from '../store/recipe.actions'
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit, OnDestroy {
  id: number;
  editMode = false;
  recipeForm: FormGroup;
  newRecipe: Recipe;
  private storeSub: Subscription;

  constructor(private route: ActivatedRoute,
    private recipeService: RecipeService,
    private router: Router,
    private dataStorageService: DataStorageService,
    private store: Store<fromApp.AppState>) { }

  ngOnInit() {
    this.route.params.subscribe(
      (params: Params) => {
        this.id = +params['id'];
        // params['id'] ? this.editMode = true : this.editMode = false;
        this.editMode = params['id'] != null;
        this.initForm();
      }
    );
  }

  onSubmit() {
    console.log(this.recipeForm.value.ingredients);
    if (this.editMode) {
      this.store.dispatch(new RecipeActions.UpdateRecipe({ index: this.id, newRecipe: this.recipeForm.value }));
    } else {
      this.store.dispatch(new RecipeActions.AddRecipe(this.recipeForm.value));
    }
    console.log(this.recipeForm);
    this.onCancel();
  }

  private initForm() {
    let recipeName = '';
    let recipeImagePath = '';
    let recipeDescription = '';
    const recipeIngredients = new FormArray([]);

    if (this.editMode) {

      this.storeSub = this.store.select('recipes').pipe(map(recipeState => {
        return recipeState.recipes.find((recipe, index) => {
          return index === this.id;
        });
      })).subscribe(recipe => {
        recipeName = recipe.name;
        recipeImagePath = recipe.imagePath;
        recipeDescription = recipe.description;

        if (recipe[`ingredients`]) {
          for (const ingredient of recipe.ingredients) {
            recipeIngredients.push(
              new FormGroup({
                name: new FormControl(ingredient.name, Validators.required),
                amount: new FormControl(ingredient.amount, [
                  Validators.required,
                  Validators.pattern(/^[1-9]+[0-9]*$/)
                ])
              })
            );
          }
        }
      });
    }

    this.recipeForm = new FormGroup({
      name: new FormControl(recipeName, Validators.required),
      imagePath: new FormControl(recipeImagePath, Validators.required),
      description: new FormControl(recipeDescription, Validators.required),
      ingredients: recipeIngredients
    });
  }

  get controls() {
    return (this.recipeForm.get('ingredients') as FormArray).controls;
  }

  onAddIngredient() {
    (this.recipeForm.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(null, Validators.required),
        amount: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[1-9]+[0-9]*$/)
        ]),
      })
    )
  }

  onCancel() {
    this.router.navigate(['../'], { relativeTo: this.route });
  }

  onDeleteIngredient(index: number) {
    (this.recipeForm.get('ingredients') as FormArray).removeAt(index);
  }


  ngOnDestroy() {
    if (this.storeSub) {
      this.storeSub.unsubscribe();
    }
  }
}

