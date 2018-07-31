import {Recipe} from './recipe.model';
import {Injectable} from '@angular/core';
import {Ingredient} from '../shared/ingredient.model';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {Subject} from 'rxjs/Subject';
import {ServerService} from '../shared/services/server.service';

@Injectable()
export class RecipeService {
  recipesChanged = new Subject<Recipe[]>();
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

  constructor(private shoppingListService: ShoppingListService,
              private serverService: ServerService) {
  }

  getRecipes() {
    return this.recipes.slice();
  }

  getRecipeById(id: number) {
    return this.recipes[id];
  }

  addToShoppingList(recipe: Recipe) {
    this.shoppingListService.addMultipleIngredients(recipe.ingredients);
  }

  addRecipe(recipe: Recipe) {
    this.recipes.push(recipe);
    this.recipesChanged.next(this.getRecipes());
  }

  updateRecipe(id: number, recipe: Recipe) {
    this.recipes[id] = recipe;
    this.recipesChanged.next(this.getRecipes());
  }

  removeRecipe(id: number) {
    this.recipes.splice(id, 1);
    this.recipesChanged.next(this.getRecipes());
  }

  storeRecipesOnServer() {
    return this.serverService.saveRecipes(this.recipes);
  }

  getRecipesFromServer() {
    return this.serverService.getRecipes()
      .subscribe((recipes: Recipe[]) => {
        this.recipes = recipes;
        this.recipesChanged.next(this.getRecipes());
      });
  }
}
