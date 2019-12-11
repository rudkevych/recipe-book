import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { TestBed } from '@angular/core/testing';
import { not } from '@angular/compiler/src/output/output_ast';

/*
 1 beforeEach declare service
 2 method toBeInstanceOf(expected)
 3 testing angular subjects
*/
//toBeDefined()
//toBeTruthy()
//toBeTrue()
// not to be null


fdescribe('TestService', () => {
  let service: RecipeService;

  beforeEach(() => {
    TestBed.configureTestingModule({ providers: [RecipeService] });
    service = TestBed.get(RecipeService);
  });

  it('should be created', () => {
    // const service: RecipeService = TestBed.get(RecipeService);
    expect(service).toBeTruthy();
  });

  it('#getRecipe should be defined', () => {
    expect(service.getRecipe).toBeDefined();
  });

  it('#getRecipe should return not Null', () => {
    const recipe = service.getRecipe(1);
    expect(recipe).not.toBeNull();
  });

  it('!!#getRecipe should return instance of Recipe', () => {
    service.addRecipe(new Recipe('test name', 'test description', 'test path', []));
    const recipe = service.getRecipe(0);
    expect(recipe).toBeInstanceOf(Recipe);
  });

  it('should call recipesChanged subject', () => {
    service.addRecipe(new Recipe('test name', 'test description', 'test path', []));
    service.recipesChanged.subscribe((recipes) => {
      expect(recipes.length).toBe(1);
      expect(recipes[0].name).toBe('test name');
    });
  });

  it('should set and get recipes', () => {
    const recipes = [
      new Recipe('test name', 'test description', 'test path', []),
      new Recipe('test name2', 'test description2', 'test path2', [])
    ];
    service.setRecipes(recipes);
    expect(service.getRecipes()).toEqual(recipes);
  });

  it('should set, update and delete recipe', () => {
    const recipes = [
      new Recipe('test name', 'test description', 'test path', []),
      new Recipe('test name2', 'test description2', 'test path2', [])
    ];
    service.setRecipes(recipes);
    const updatedRecipe = new Recipe(
      'updated name', 'updated description', 'updated path', []);
    service.updateRecipe(0, updatedRecipe);
    expect(service.getRecipe(0).name).toBe('updated name');
    service.deleteRecipe(0);
    expect(service.getRecipes().length).toBe(1);
  });

});
