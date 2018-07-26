import {Ingredient} from '../shared/ingredient.model';
import {Subject} from 'rxjs/Subject';

export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  private newIngredient = new Subject<void>();
  startedEditing = new Subject<number>();

  addIngredient(ingredient: Ingredient) {
    const foundIngredient = this.ingredients.find((item) => item.name === ingredient.name);
    if (foundIngredient) {
      foundIngredient.amount += ingredient.amount;
    } else {
      this.ingredients.push(ingredient);
    }
    this.newIngredient.next();
  }

  addMultipleIngredients(ingredients: Ingredient[]) {
    ingredients.forEach((ingredient) => {
      this.addIngredient(ingredient);
    });
  }

  getIngredients() {
    return this.ingredients.slice();
  }

  updateIngredientsList() {
    return this.newIngredient;
  }

  getIngredient(id: number) {
    return this.ingredients[id];
  }

  removeIngredient(id: number) {
    this.ingredients.splice(id, 1);
    this.updateIngredientsList().next();
  }

  updateIngredient(id: number, ingredient: Ingredient) {
    this.ingredients[id] = ingredient;
    this.updateIngredientsList().next();
  }

}
