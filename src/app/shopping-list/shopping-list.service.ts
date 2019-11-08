import { Ingredient } from './../shared/ingredient.model';

export class ShoppingListService {
    ingredients: Ingredient[] = [
        new Ingredient('Apples', 5),
        new Ingredient('Bananas', 3)
    ];

    getIngredients() {
        return this.ingredients;
    }

    addNewIngredients(newIngredients: Ingredient[]) {
        this.ingredients.push(...newIngredients);
        console.log(this.ingredients);
    }
}