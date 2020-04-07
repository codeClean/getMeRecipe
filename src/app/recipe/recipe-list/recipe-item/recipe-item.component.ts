import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Recipe } from '../../recipe.model';
import { RecipeService } from '../../recipe.service';

@Component({
  selector: 'app-recipe-item',
  templateUrl: './recipe-item.component.html',
  styleUrls: ['./recipe-item.component.css']
})
export class RecipeItemComponent implements OnInit {

  @Input() getRecipe: Recipe;
  @Input() inputIndex: number;

   constructor(private recipeSer: RecipeService) { }

  ngOnInit(): void {
    //this.getRecipe =  this.recipeSer.getRecipe(); 
  }
  detailFunc() {
    this.recipeSer.onRecipeEmit(this.getRecipe);
  }
  

}
