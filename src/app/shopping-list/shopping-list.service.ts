import {Ingredient} from '../shared/ingredient.model';
import {EventEmitter} from '@angular/core';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatos', 10),
  ];
  private newIngredient = new EventEmitter<void>();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredient.emit();
  }

  getIngredients() {
    return this.ingredients;
  }

  updateIngredientsList() {
    return this.newIngredient;
  }

}
