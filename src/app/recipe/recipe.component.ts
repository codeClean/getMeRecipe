import { Component, OnInit, Input } from '@angular/core';
import { Recipe } from './recipe.model';
import { RecipeService } from './recipe.service';
import { DataStorageService } from '../shared/data-storage.service';

@Component({
  selector: 'app-recipe',
  templateUrl: './recipe.component.html',
  styleUrls: ['./recipe.component.css']
})
export class RecipeComponent implements OnInit {

  selectedRecipe: Recipe;

  notifyMessage: string;
  notify: boolean;
  // @Input() recipeWasSelected: Recipe ;
  constructor(private recipeSer: RecipeService, private dataServ: DataStorageService) { }

  ngOnInit(): void {
   /*  this.recipeSer.recipeWasSelected.subscribe(
    (recip: Recipe) => this.selectedRecipe = recip); */

      const result =  this.dataServ.fetchRecipe().subscribe(response => {
          if (!response) {
            this.notifyMessage = ' There is no recipe ';

          } else {
                      this.notifyMessage = ' you have ' + response.length + ' recipe/s ';

          }
          this.notify = true;
          setTimeout(() => {
              this.notify = false;
          }, 4000);
      });

     // this.recipeSer.getAllRecipe();
  }
}
