import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {RecipeStartComponent} from './recipe-start/recipe-start.component';
import {RecipesComponent} from './recipes.component';
import {AuthGuard} from '../auth/services/auth.guard';
import {RecipeEditComponent} from './recipe-edit/recipe-edit.component';
import {RecipeDetailsComponent} from './recipe-details/recipe-details.component';

const routes: Routes = [
  {
    path: '', component: RecipesComponent, children: [
      {path: '', component: RecipeStartComponent},
      {path: 'new', component: RecipeEditComponent, canActivate: [AuthGuard]},
      {path: ':id', component: RecipeDetailsComponent},
      {path: ':id/edit', component: RecipeEditComponent, canActivate: [AuthGuard]}
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class RecipesRoutingModules {
}
