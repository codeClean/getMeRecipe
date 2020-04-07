import { Component, EventEmitter, Output, OnInit, OnDestroy } from '@angular/core';
import { DataStorageService } from '../shared/data-storage.service';
import { LoginService } from '../login/login.service';
import { Router, ActivatedRouteSnapshot, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { RecipeService } from '../recipe/recipe.service';
@Component({
    selector: 'app-header',
    templateUrl: './header.component.html'
})

export class HeaderComponent implements OnInit, OnDestroy {
    @Output() emitFeature = new EventEmitter<string>();
    isLoggedIn = false;
    loginSubscription: Subscription;
    fetchSubscription: Subscription;

    userEmail = null;
    notify = false;
    notifyMessage = '';

    onSelect(feature: string) {
        this.emitFeature.emit(feature);
        // console.log(feature + ' is selected' );
    }

    constructor(private dataServ: DataStorageService,
                private logSer: LoginService,
                private routActive: ActivatedRoute,
                private router: Router,
                private recipeServ: RecipeService) { }

    ngOnInit() {
        this.loginSubscription = this.logSer.user.subscribe(user => {
            this.isLoggedIn = !!user; // if user exist true else false;
            if (this.isLoggedIn) {
                this.userEmail = user.email;
            }
        });
    }

    saveRecipe() {
        this.dataServ.saveRecipe();
    }
    fetchRecipe() {
       const result =  this.dataServ.fetchRecipe().subscribe(response => {
           console.log(response);
           this.notifyMessage = ' you have ' + response.length + ' recipe/s ';
           this.notify = true;
           setTimeout(() => {
               this.notify = false;
           }, 5000);
       });
     }
    onLogout() {
        this.logSer.onLogOut();
        console.log('loging out');
    }
     ngOnDestroy() {
        this.loginSubscription.unsubscribe();
        this.fetchSubscription.unsubscribe();
    }

    onAccount() {

        this.router.navigate(['account']);

    }
    myrecipe() {
       console.log('my recipe ');

       this.recipeServ.onGetPrivateRecipe();
      // this.router.navigateByUrl('/myrecipe');

      // this.router.navigate(['myrecipe'],{relativeTo:});
    }
}
