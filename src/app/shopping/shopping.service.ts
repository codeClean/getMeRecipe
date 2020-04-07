import {Ingredient} from '../shared/shared.model';
import { EventEmitter, inject } from '@angular/core';
import { Subject, Subscription } from 'rxjs';


export class ShoppingService {

      editIngredient  = new Subject<number>();
      ingredientChange   = new Subject<Ingredient[]>();
      ingChangSub: Subscription ;
      private ingredients: Ingredient [] = [new Ingredient('pasta', 10) ];

      getIngredient() {
          return this.ingredients.slice();
      }

        onIngrediantAdd(dataIngredient: Ingredient) {
            console.log('about to emit');
            this.ingredients.push(dataIngredient);
            this.ingredientChange.next(this.ingredients.slice());
          }

          addIngredients(ingredients: Ingredient[]) {
            this.ingredients.push(...ingredients);
            this.ingredientChange.next(this.ingredients);
            console.log('got the ingredient array ');
          }
          onIngredientUpdate(index: number, ingredient: Ingredient){
            this.ingredients[index] = ingredient;
            this.ingredientChange.next(this.ingredients);
          }

          onDelete(index: number) {
            console.log('this delete ' + index);
            this.ingredients.splice(index, 1);
            this.ingredientChange.next(this.ingredients);
          }

    }
