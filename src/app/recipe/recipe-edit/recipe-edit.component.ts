import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { FormControl, FormGroup, FormArray, Validators } from '@angular/forms';
import { RecipeService } from '../recipe.service';
import { Recipe } from '../recipe.model';

@Component({
  selector: 'app-recipe-edit',
  templateUrl: './recipe-edit.component.html',
  styleUrls: ['./recipe-edit.component.css']
})
export class RecipeEditComponent implements OnInit {

  id: number;
  editMode = false;
  recipeFormGroup: FormGroup;
  recipeVal: Recipe;
  ingredientsFrom: FormArray;
  ingFormGroup: FormGroup;

  constructor(private router: Router, private rout: ActivatedRoute, private recipeService: RecipeService) { }

  ngOnInit(): void {

    this.rout.params.subscribe((param: Params) => {
      this.id = +param.id;
      this.editMode = param.id != null ? true : false;
      this.recipeVal = this.recipeService.getRecipe()[this.id];
      this.ingredientsFrom = new FormArray([]);
      if (this.editMode && this.recipeVal && this.recipeVal.ingredients != null) {
        for (const ing of this.recipeVal.ingredients) {
          this.ingredientsFrom.push( new FormGroup({
            name: new FormControl(ing.name, Validators.required),
            amount: new FormControl(ing.amount, [Validators.required, Validators.pattern(/^[1-9]+[0-9]*$/)])
          })
        );
        }
      }

      this.initForm();
    });
  }

  addIngredient() {
    ( this.recipeFormGroup.get('ingredients') as FormArray).push(
      new FormGroup({
        name: new FormControl(),
        amount: new FormControl()
      })
    );

   // this.initForm();
  }
  private initForm() {
    let nameForm = '';
    let imagePathForm = '';
    let descriptionForm = '';
    if (this.editMode) {
        nameForm = this.recipeVal.name;
        imagePathForm = this.recipeVal.imagePath;
        descriptionForm = this.recipeVal.description;
        // ingredients =  this.ingredientsFrom;
    }

    this.recipeFormGroup = new FormGroup({
      name: new FormControl(nameForm, Validators.required),
      imagePath: new FormControl(imagePathForm, Validators.required),
      description: new FormControl(descriptionForm, Validators.required),
      ingredients: this.ingredientsFrom
    });
  }
  getControl() {
      return ( this.recipeFormGroup.get('ingredients') as FormArray).controls;
    }

    addRecipe() {
      const recipeNew: Recipe = new Recipe(null, null, null, null);
      if (this.editMode) {
          this.recipeService.uppdateRecipe(this.id, this.recipeFormGroup.value);
      } else {
         this.recipeService.addRecipe(this.recipeFormGroup.value);
      }
      this.router.navigate(['../'], {relativeTo: this.rout});
      // console.log('recipe ' + recipeNew.name);
    }

    onCancel() {
      this.router.navigate(['../'], {relativeTo: this.rout});
    }

    onDeleteIngredient(index: number) {

      ( this.recipeFormGroup.get('ingredients') as FormArray).removeAt(index);
    }

}
