import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  private newIngredient = new EventEmitter<void>();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredient.emit();
  }

  addMultipleIngredients(ingredients: Ingredient[]) {
    const newIngredients: Ingredient[] = [];
    ingredients.forEach((ingredient) => {
      const foundIngredient = this.ingredients.find((item) => item.name === ingredient.name);
      if (foundIngredient) {
        foundIngredient.amount += ingredient.amount;
      } else {
        newIngredients.push(ingredient);
      }
    });
    this.ingredients = this.ingredients.concat(newIngredients);
    this.newIngredient.emit();
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredientsList() {
    return this.newIngredient;
  }

}
