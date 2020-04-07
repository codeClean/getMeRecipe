import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { RecipeComponent } from './recipe/recipe.component';
import { ShoppingComponent } from './shopping/shopping.component';
import { RecipeDetailComponent } from './recipe/recipe-detail/recipe-detail.component';
import { RecipeStartComponent } from './recipe/recipe-start/recipe-start.component';
import { RecipeEditComponent } from './recipe/recipe-edit/recipe-edit.component';
import { ResolverService } from './shared/resolver.service';
import { LoginComponent } from './login/login.component';
import { AuthGuard } from './login/auth.guard';
import { AccountComponent } from './account/account.component';

const appRoutes: Routes = [
  { path: '', redirectTo: '/recipe', pathMatch: 'full' },
  {
    path: 'recipe', component: RecipeComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '', component: RecipeStartComponent
      },
      {
        path: 'new', component: RecipeEditComponent
      },
      {
        path: ':id', component: RecipeDetailComponent, resolve: [ResolverService]
      },
      {
        path: ':id/edit', component: RecipeEditComponent, resolve: [ResolverService]
      }
    ]
  },
  { path: 'account', component: AccountComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },

  { path: 'shopping', component: ShoppingComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(appRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
