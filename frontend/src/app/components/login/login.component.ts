import { Component } from '@angular/core';
import { UserService } from '../../services/user/user.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  hide: boolean = true;
  loginForm!: FormGroup;
  returnUrl = '';

  constructor(private userService: UserService, private router: Router, private activatedRoute: ActivatedRoute) {
    this.loginForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(1)]),
      password: new FormControl('', [Validators.required, Validators.minLength(1)])
    });
    this.returnUrl = this.activatedRoute.snapshot.queryParams['returnUrl'];
  }
  hidePassword() {
    this.hide = !this.hide;
  }

  get username() {
    return this.loginForm.get('username');
  }

  get password() {
    return this.loginForm.get('password');
  }

  login() {
    if (this.loginForm.valid) {
      this.userService.login({ username: this.username?.value, password: this.password?.value }).pipe(
        catchError((error) => {
          alert('Invalid username or password!');
          return of(null);
        })
      ).subscribe((user) => {
        if (user) {
          alert(`Welcome ${user.username}!`);
          this.router.navigateByUrl(this.returnUrl);
        }
      });
    }
  }
}

