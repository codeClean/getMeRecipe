import { Resolve, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import { Recipe } from '../recipe/recipe.model';
import { DataStorageService } from './data-storage.service';
import { Injectable } from '@angular/core';
import { RecipeService } from '../recipe/recipe.service';

@Injectable({providedIn: 'root'})
export class ResolverService implements Resolve<Recipe[]> {

    constructor(private dataSer: DataStorageService, private recipeSer: RecipeService) {}

    resolve(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
        const recipes  = this.recipeSer.getRecipe();
        if (recipes.length === 0 ) { return this.dataSer.fetchRecipe(); } 
        else {
        return recipes;
    }
    }
 }
