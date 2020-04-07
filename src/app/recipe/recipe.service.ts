import { Recipe } from './recipe.model';
import { EventEmitter, Injectable } from '@angular/core';
import { Ingredient } from '../shared/shared.model';
import { ShoppingService } from '../shopping/shopping.service';
import { Subject } from 'rxjs';
import { DataStorageService } from '../shared/data-storage.service';

@Injectable()
export class RecipeService {
   // console.log("recipe service");
   recipeWasSelected = new EventEmitter<Recipe>();
   recipeAdd = new Subject<Recipe[]>();
   recipeSingleAdd = new Subject<Recipe>();


   dataForshoppingEmit = new EventEmitter<string>();

   private recipes: Recipe[] = [];

   private privateRecipes: Recipe[] = [];
   constructor(public shopingSer: ShoppingService) {

   }
   getRecipe() {
      return this.recipes.slice();
   }
   getSingleRecipe(recipe: Recipe) {
      this.recipeSingleAdd.next(recipe);
   }
   getAllRecipe() {
      this.recipeAdd.next(this.recipes);
   }
   setRecipe(recipe: Recipe[]) {
      this.recipes = recipe;
      this.recipeAdd.next(this.recipes);
   }

   onRecipeEmit(rec: Recipe) {
      this.recipeWasSelected.emit(rec);
   }

   onShoppingEmit(ingredients: Ingredient[]) {
      this.shopingSer.addIngredients(ingredients);
   }

   addRecipe(recipe: Recipe) {
      recipe.username = JSON.parse(localStorage.getItem('userData')).email;
      this.recipes.push(recipe);
      this.recipeAdd.next(this.recipes);
   }
   uppdateRecipe(index: number, recipe: Recipe) {
      recipe.username = JSON.parse(localStorage.getItem('userData')).email;
      this.recipes[index] = recipe;
      this.recipeAdd.next(this.recipes);
   }
   deleteRecipe(index: number) {
      this.recipes.splice(index, 1);
      this.recipeAdd.next(this.recipes);
   }

   onGetPrivateRecipe() {
      const username = JSON.parse(localStorage.getItem('userData')).email;
      const myrecipes = this.recipes.filter( myrecipe => {
         return myrecipe.username === username;
      });
      this.recipeAdd.next(myrecipes);
   }
}
