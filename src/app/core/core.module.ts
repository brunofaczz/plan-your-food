import {NgModule} from '@angular/core';

import {HeaderComponent} from './header/header.component';
import {HomeComponent} from './home/home.component';
import {SharedModule} from '../shared/shared.module';
import {AppRoutingModule} from '../app.routing.module';
import {ServerService} from '../shared/services/server.service';
import {AuthService} from '../auth/services/auth.service';
import {ShoppingListService} from '../shopping-list/shopping-list.service';
import {RecipeService} from '../recipes/recipe.service';
import {AuthGuard} from '../auth/services/auth.guard';

@NgModule({
  declarations: [
    HeaderComponent,
    HomeComponent
  ],
  imports: [
    SharedModule,
    AppRoutingModule
  ],
  providers: [
    ShoppingListService,
    RecipeService,
    ServerService,
    AuthService,
    AuthGuard
  ],
  exports: [
    HeaderComponent,
    AppRoutingModule
  ]
})
export class CoreModule {

}
