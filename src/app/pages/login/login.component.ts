import {Component, OnInit } from '@angular/core';
import {AbstractControl, FormControl, FormGroup, Validators} from '@angular/forms';
import { Router } from '@angular/router';
import {MatSnackBar} from "@angular/material/snack-bar";
import {take} from "rxjs";
import {UserService} from "../../services/user.service";
import {RoutesEnum} from "../../helper/routes";
import {passwordRegex, userRegex} from "../register/register.component";
import {User} from "../../_models";
import {MyErrorStateMatcher} from "../../components/helpers";

@Component({
  selector: 'login',
  templateUrl: 'login.component.html',
  styleUrls: ['login.component.scss']
})
export class LoginComponent implements OnInit {
  hasError = null;
  loading = false;
  submitted = false;
  emailRegex = "^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$";

  constructor(private userService: UserService,
              private router: Router,
              private _snackBar: MatSnackBar
  ) {}

  userFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern(userRegex)
  ]);
  passFormControl = new FormControl('', [
    Validators.required,
    Validators.minLength(8),
    Validators.maxLength(20),
    Validators.pattern(passwordRegex)]);

  matcher = new MyErrorStateMatcher();
  loginForm: any;
  hide = true;

  ngOnInit() {
    this.loginForm = new FormGroup({
      userFormControl: this.userFormControl,
      passFormControl: this.passFormControl
    });
  }

  get f(): { [key: string]: AbstractControl } {
    return this.loginForm.controls;
  }
  onSubmit(): void {
    this.submitted = true;

    if (this.loginForm.invalid) {
      return;
    }
    this.loading = true;
    this.hasError = null;

    const filter: {user: string|null; pass: string|null} = {
        user: this.userFormControl.value,
        pass: this.passFormControl.value
      };

    this.userService.login(filter)
      .pipe(take(1))
      .subscribe({
        next: (res) => {
          debugger;
          if (res && res.granted) {
            if (res.message) {
              this._snackBar.open(
                `${res.message}`,
                'OK, Great!',
                {duration: 5000});
            }
            this.router.navigate(['/' + RoutesEnum.home]);
            const user = new User(
              res.user,
              res.uuid,
              res.pass);
            this.userService.setUser(user);
            this.userService.isLoggedIn.next(true);
          } else {
            this._snackBar.open(
              `Somthing went wrong!`,
              'Error.',
              {duration: 5000});
            this.loading = false;
          }
        },
        error: (err) => {
          if (err) {
            this.hasError = err.error;
            this.loading = false;
          }
        }
      });

    console.log(JSON.stringify(this.loginForm.value, null, 2));
  }

  onReset(): void {
    this.submitted = false;
    this.loginForm.reset();
  }
}

// https://stackblitz.com/edit/angular-8-basic-authentication-example?file=src%2Fapp%2Flogin%2Flogin.component.html,src%2Fapp%2Flogin%2Flogin.component.ts
// https://www.bezkoder.com/angular-14-spring-boot-jwt-auth/
