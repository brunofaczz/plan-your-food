import {Recipe} from './recipe.model';
import {EventEmitter, Output} from '@angular/core';

export class RecipeService {
  private recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('A test recipe', 'Just a test recipe', 'https://img.bestrecipes.com.au/rZFo7F' +
      '8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg'),
    new Recipe('A test recipe', 'Just a test recipe', 'https://img.bestrecipes.com.au/rZFo7F' +
      '8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg')
  ];

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeSelected() {
    return this.recipeSelected;
  }

  setRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }
}
