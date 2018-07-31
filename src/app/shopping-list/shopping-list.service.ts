import {Subject} from 'rxjs/Subject';
import {Injectable} from '@angular/core';
import 'rxjs/add/operator/finally';

import {ServerService} from '../shared/services/server.service';
import {Ingredient} from '../shared/ingredient.model';

@Injectable()
export class ShoppingListService {
  private ingredients: Ingredient[] = [
    new Ingredient('Apples', 5),
    new Ingredient('Tomatoes', 10),
  ];
  private newIngredient = new Subject<void>();
  startedEditing = new Subject<number>();

  constructor(private serverService: ServerService) {
  }

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

  storeShoppingListOnServer() {
    return this.serverService.saveShoppingList(this.ingredients);
  }

  getShoppingListFromServer() {
    this.serverService.getShoppingList()
      .subscribe((ingredients: Ingredient[]) => {
        this.ingredients = ingredients;
        this.newIngredient.next();
      });
  }

}
