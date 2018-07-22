import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  private newIngredient = new Subject();

  addIngredient(ingredient: Ingredient) {
    this.ingredients.push(ingredient);
    this.newIngredient.next();
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
    this.newIngredient.next();
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredientsList() {
    return this.newIngredient;
  }

}
