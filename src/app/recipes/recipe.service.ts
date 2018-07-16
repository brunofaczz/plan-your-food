import {Recipe} from './recipe.model';
import {EventEmitter, Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Injectable()
export class RecipeService {
  private recipeSelected = new EventEmitter<Recipe>();

  private recipes: Recipe[] = [
    new Recipe('Fucking Pizza',
      'This is awesome!!',
      'https://img.bestrecipes.com.au/rZFo7F' +
      '8i/h300-w400-cscale-1495077669/br-api/asset/20771/super-easy-pizza-dough-recipe.jpg',
      [new Ingredient('Massa', 1),
        new Ingredient('Tomatoes', 3)]),
    new Recipe('Furious Whopper',
      'This is for your starvation',
      'https://www.seriouseats.com/recipes/images/2015/07/20150728-homemade-whopper-food-lab-35.jpg',
      [new Ingredient('Bread', 2),
        new Ingredient('Meat', 1)])
  ];

  constructor(private shoppingListService: ShoppingListService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeSelected() {
    return this.recipeSelected;
  }

  setRecipeSelected(recipe: Recipe) {
    this.recipeSelected.emit(recipe);
  }

  addToShoppingList(recipe: Recipe) {
    this.shoppingListService.addMultipleIngredients(recipe.ingredients);
  }
}
