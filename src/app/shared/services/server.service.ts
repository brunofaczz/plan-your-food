import {Injectable} from '@angular/core';
import {Http} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

import {Recipe} from '../../recipes/recipe.model';
import {Ingredient} from '../ingredient.model';
import {AuthService} from '../../auth/services/auth.service';

@Injectable()
export class ServerService {
  private RECIPESURL = 'https://ng-recipe-book-13445.firebaseio.com/recipes.json';
  private SHOPPINGLISTURL = 'https://ng-recipe-book-13445.firebaseio.com/shopping-list.json';

  constructor(private http: Http,
              private authService: AuthService) {
  }

  saveRecipes(recipes: Recipe[]) {
    const token = this.authService.getToken();

    return this.http.put(`${this.RECIPESURL}?auth=${token}`, recipes);
  }

  getRecipes() {
    const token = this.authService.getToken();

    return this.http.get(`${this.RECIPESURL}?auth=${token}`)
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
    const token = this.authService.getToken();

    return this.http.put(`${this.SHOPPINGLISTURL}?auth=${token}`, ingredients);
  }

  getShoppingList() {
    const token = this.authService.getToken();

    return this.http.get(`${this.SHOPPINGLISTURL}?auth=${token}`)
      .map((response) => response.json())
      .catch(() => Observable.throw('Something went wrong'));
  }
}
