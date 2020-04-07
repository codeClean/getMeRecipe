import { Component, Directive, OnInit, ViewChild, ElementRef, EventEmitter, Output } from '@angular/core';
import { Ingredient } from 'src/app/shared/shared.model';
import { ShoppingService } from '../shopping.service';
import { FormControl, NgForm } from '@angular/forms';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-shopping-edit',
  templateUrl: './shopping-edit.component.html',
  styleUrls: ['./shopping-edit.component.css']
})
export class ShoppingEditComponent implements OnInit {
/* @ViewChild('nameInput') nameInputRef: ElementRef;
@ViewChild('amountInput') amountInputRef: ElementRef; */
@ViewChild('f') formControl: FormControl;

subscribIngredient: Subscription;
ingredient: Ingredient;
isEdited = false;
ingredientIndex: number;
// @Output() ingredientAdded = new EventEmitter<Ingredient>();
  constructor(private shoppingService: ShoppingService) { }

  ngOnInit(): void {
    this.subscribIngredient = this.shoppingService.editIngredient.subscribe((index: number) => {
        this.ingredientIndex = index;
        this.ingredient = this.shoppingService.getIngredient()[index];
        this.formControl.setValue({name: this.ingredient.name, amount: this.ingredient.amount});
        this.isEdited = true;
        console.log('ingredient ' + this.ingredient );
    });
  }
  onSubmit(form: NgForm) {
   /*  const ingName = this.nameInputRef.nativeElement.value;
    const ingAmount = this.amountInputRef.nativeElement.value;
 */
        const ingName = form.value.name;
        const ingAmount = form.value.amount;

        const newIngredientAdded = new Ingredient(ingName, ingAmount);
        if (this.isEdited) {
          this.shoppingService.onIngredientUpdate(this.ingredientIndex, newIngredientAdded);
        } else {
        this.shoppingService.onIngrediantAdd(newIngredientAdded);
          // this.ingredientAdded.emit(newIngredientAdded);
        }
        this.isEdited = false;
        form.reset();
  }
  onDelete(){
    this.shoppingService.onDelete(this.ingredientIndex);
    this.formControl.reset();
    this.isEdited = false;
  }

  onClear(){
    this.formControl.reset();
    this.isEdited = false;
  }


}
