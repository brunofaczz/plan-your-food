import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Recipe} from '../../recipes/recipe.model';
import {Ingredient} from '../ingredient.model';

@Injectable()
export class ServerService {
  private RECIPESURL = 'https://ng-recipe-book-13445.firebaseio.com/recipes.json';
  private SHOPPINGLISTURL = 'https://ng-recipe-book-13445.firebaseio.com/shopping-list.json';

  constructor(private http: Http) {
  }

  saveRecipes(recipes: Recipe[]) {
    return this.http.put(this.RECIPESURL, recipes);
  }

  getRecipes() {
    return this.http.get(this.RECIPESURL)
      .map((response) => {
        const recipes = response.json();
        for (const recipe of recipes) {
          if (!recipe.ingredients) {
            recipe.ingredients = [];
          }
        }
        return recipes;
      })
      .catch(() => Observable.throw('Something went wrong'));
  }

  saveShoppingList(ingredients: Ingredient[]) {
    return this.http.put(this.SHOPPINGLISTURL, ingredients);
  }

  getShoppingList() {
    return this.http.get(this.SHOPPINGLISTURL)
      .map((response) => response.json())
      .catch(() => Observable.throw('Something went wrong'));
  }
}
