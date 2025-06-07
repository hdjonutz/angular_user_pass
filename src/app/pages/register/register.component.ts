import { Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from "@angular/material/core";
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {take} from "rxjs";
import {generateUUID} from "../../../app/helper/helper";
import {IMessages, User} from "../../_models";
import {RoutesEnum} from "../../helper/routes";
import {UserService} from "../../services/user.service";
import { faLadderWater } from '../../../../_node_modules/@fortawesome/free-solid-svg-icons';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export const userRegex = "^[a-zA-Z0-9- ]{4,50}$";
export const passwordRegex = "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[$@$!%*?&])[A-Za-z\d$@$!%*?&].{8,20}$";

@Component({
  selector: 'register',
  templateUrl: 'register.component.html',
  styleUrls: ['register.component.scss']
})
export class RegisterComponent implements OnInit {
  hasError = null;
  loading = true;
  submitted = false;

  constructor(private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar
  ) {}

  id = new FormControl(null, []);

  userRegexFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(4),
    Validators.maxLength(50),
    Validators.pattern(userRegex)
  ]);

  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(passwordRegex)]);

  token = new FormControl(generateUUID(), [
    Validators.required]);

  matcher = new MyErrorStateMatcher();
  registerForm: any;
  hide = true;

  ngOnInit() {
    this.registerForm = new FormGroup({
      userFormControl: this.userRegexFormControl,
      passFormControl: this.passFormControl,
      token: this.token
    });
    this.registerForm.valueChanges.subscribe((value: any) => {
        this.loading = !this.registerForm.valid;
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.registerForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (!this.registerForm.valid) {
      return;
    }
    this.loading = true;
    this.hasError = null;
    const user = new User(
      this.userRegexFormControl.value + '',
      this.token.value +'',
      this.passFormControl.value + '');

    this.userService.register(user)
      .pipe(take(1))
      .subscribe({
        next: (res: User & IMessages) => {
          if (res) {
            const action: string = 'Redirect to home';
            this._snackBar.open('Registration completed!', action, {
              duration: 5000
            });
            this.userService.setItem('data', {login: true, last: new Date().getTime()})
            .pipe(take(1))
            .subscribe((res) => {
              if (res) {
                this.userService.setUser(user);
                this.userService.isLoggedIn.next(true);
              }
              this.router.navigate(['/' + RoutesEnum.home]);
            });
          }
        },
        error: (err: any) => {
          if (err) {
            this.hasError = err.error;
            this.loading = false;
            this._snackBar.open('Register Form has errors.', 'OK, Try Again', {
              duration: 5000
            });
          }
        }
      });

    console.log(JSON.stringify(this.registerForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.registerForm.reset();
  }
}

// https://stackblitz.com/edit/angular-8-basic-authentication-example?file=src%2Fapp%2Fregister%2Fregister.component.html,src%2Fapp%2Fregister%2Fregister.component.ts
