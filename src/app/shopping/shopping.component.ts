import { Component, OnInit, Input } from '@angular/core';
import {Ingredient} from '../shared/shared.model';
import { from } from 'rxjs';
import {ShoppingService} from './shopping.service';

@Component({
  selector: 'app-shopping',
  templateUrl: './shopping.component.html',
  styleUrls: ['./shopping.component.css'] 
})
export class ShoppingComponent implements OnInit {

  // @Input() ingredientAdded: Ingredient;

  ingredients: Ingredient [];
  constructor(private shoppingService: ShoppingService) { }

 

  ngOnInit() {
    this.ingredients = this.shoppingService.getIngredient();
    this.shoppingService.ingredientChange
      .subscribe(
        (ingredients: Ingredient[]) => {
          this.ingredients = ingredients;
        }
      );
  }
  onEdit(index: number){
        this.shoppingService.editIngredient.next(index);
  }


}
