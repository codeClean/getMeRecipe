import { Component, OnInit, Output, EventEmitter, OnDestroy } from '@angular/core';
import {Recipe} from '../recipe.model';
import { RecipeService } from '../recipe.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { THIS_EXPR } from '@angular/compiler/src/output/output_ast';


@Component({
  selector: 'app-recipe-list',
  templateUrl: './recipe-list.component.html',
  styleUrls: ['./recipe-list.component.css']
})
export class RecipeListComponent implements OnInit , OnDestroy {

 @Output() recipeWasSelected = new EventEmitter<Recipe>();
  recipes: Recipe [];
  recipeSubscription: Subscription;
  notifyMessage: string;
  notify: boolean;

  constructor(private recipeSer: RecipeService,
              private router: Router,
              private route: ActivatedRoute) {
    // console.log('test reecipe ' + this.recipes[0].description);
  }
  ngOnDestroy(): void {
    this.recipeSubscription.unsubscribe();
  }

  ngOnInit(): void {
   this.recipeSubscription = this.recipeSer.recipeAdd.subscribe((recipes: Recipe[]) => {
    // console.log(recipes);

    if (this.router.url === '/recipe/myrecipe') { console.log('url is myrecipe'); } else {console.log(' cant find url');
    }

    this.notifyMessage = ' you have ' + recipes.length + ' recipe/s ';
    this.notify = true;
    setTimeout(() => {
        this.notify = false;
    }, 5000);
    this.recipes = recipes;
    // this.recipes = null;
    });
   this.recipes = this.recipeSer.getRecipe();


  }

  newRecipe() {
    this.router.navigate(['new'], {relativeTo: this.route});
  }

}
