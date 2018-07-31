import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/mergeMap';

import {RecipeService} from '../recipes/recipe.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipesService: RecipeService,
              private shoppingListService: ShoppingListService) {
  }

  ngOnInit() {
  }

  onSave() {
    this.recipesService.storeRecipesOnServer()
      .mergeMap(() => this.shoppingListService.storeShoppingListOnServer())
      .subscribe();
  }

  onFetch() {
    this.recipesService.getRecipesFromServer();
    this.shoppingListService.getShoppingListFromServer();
  }

}
