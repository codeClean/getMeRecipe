import { Component, OnInit, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, NgForm } from '@angular/forms';
import { LoginService } from './login.service';
import { Subscription, observable, from, Observable } from 'rxjs';
import { AuthenticationResponce } from './login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  //#region error messages
  errorUsername = 'user name must be a valid email';
  errorPassword = 'at least 6 characters is required';
  errorMessage = 'invalid user name and password';
  errorConfirmation = 'password does not much';
  //#endregion error messages

  //#region  declarations
  loginSubscription: Subscription;
  passwordMatch = true;
  isLoading = false;
  error = null;
  signingUp = false;
  //#endregion declaration

  constructor(private loginSer: LoginService, private router: Router) { }

  ngOnInit(): void {
  }

  onHandleClose(){
    this.error = null;
  }

  submit(form: NgForm) {
    this.isLoading = true;
    if (!form.value) { return; }
    const email = form.value.email;
    const password = form.value.password;
    let loginObservable: Observable<AuthenticationResponce>; // to serve for both signUp and login

    //#region sign up and login
    if (this.signingUp) {
      const confirmPassword = form.value.confirmPassword;
      if (confirmPassword !== password) {
        this.isLoading = false;
        form.reset();
        this.passwordMatch = false; return;
      }
      loginObservable = this.loginSer.onSignUp(email, password) as Observable<AuthenticationResponce>;
    } else {
      loginObservable = this.loginSer.onLogin(email, password) as Observable<AuthenticationResponce>;
    }
    this.loginSubscription = loginObservable.subscribe(response => {
      // success 
      this.router.navigate(['/recipe']);

    }, errorResponse => {
      console.log('error message ' + errorResponse);
      this.error = errorResponse;
      form.reset();
    });
    this.isLoading = false;
  }
  signUp() {
    this.signingUp = true;
  }

  switchToLogin(){
    this.signingUp = false;
  }
  

}
