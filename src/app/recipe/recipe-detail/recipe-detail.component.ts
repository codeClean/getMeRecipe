import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-recipe-detail',
  templateUrl: './recipe-detail.component.html',
  styleUrls: ['./recipe-detail.component.css']
})
export class RecipeDetailComponent implements OnInit {
recipeWasSelected: Recipe;
  notificationMessage = null;
  id: number;

  constructor(private recipeSer: RecipeService, private router: Router, private rout: ActivatedRoute) { }

  ngOnInit(): void {
    console.log('recipe data ' + this.recipeWasSelected);

    this.rout.params.subscribe((param: Params) => {
      this.id = param.id;
      this.recipeWasSelected = this.recipeSer.getRecipe()[this.id];
    });
    this.recipeSer.recipeAdd.subscribe((recipe: Recipe[]) => {
      this.recipeWasSelected = this.recipeSer.getRecipe()[this.id];
      console.log('recipe next');

    });

  }

  sendToShopping() {
   const ingNumber = this.recipeWasSelected.ingredients.length;
   this.notificationMessage = ' You have added ' + ingNumber + ' ingredients to shopping list ';
   setTimeout(() => {
      this.notificationMessage = null;
    }, 4000);
   this.recipeSer.onShoppingEmit(this.recipeWasSelected.ingredients);
  }
  editRecipe() {
    const currentUser = JSON.parse(localStorage.getItem('userData')).email;
    if (currentUser !== this.recipeWasSelected.username) {
      this.notificationMessage = ' you cant edit: You DO NOT own this recipe!!';
      setTimeout(() => {
        this.notificationMessage = null;
      }, 4000);
      return;
    }
    // if you are really the owner
    this.router.navigate(['edit'], {relativeTo: this.rout});
  }

  onDelete() {
    const currentUser = JSON.parse(localStorage.getItem('userData')).email;
    if (currentUser !== this.recipeWasSelected.username) {
      this.notificationMessage = ' you cant delete: You DO NOT own this recipe!!';
      setTimeout(() => {
        this.notificationMessage = null;
      }, 4000);
      return;
    }
    this.recipeSer.deleteRecipe(this.id);
    this.router.navigate(['/recipe']);
  }
}
