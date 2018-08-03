import {Component, OnInit} from '@angular/core';
import 'rxjs/add/operator/mergeMap';

import {RecipeService} from '../../recipes/recipe.service';
import {ShoppingListService} from '../../shopping-list/shopping-list.service';
import {AuthService} from '../../auth/services/auth.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  constructor(private recipesService: RecipeService,
              private shoppingListService: ShoppingListService,
              private authService: AuthService) {
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

  onLogout() {
    this.authService.logout();
  }

  isAuthenticated() {
    return this.authService.isAuthenticated();
  }

}
