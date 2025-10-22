import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../../services/user/user.service';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { catchError, of } from 'rxjs';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent {
  hide: boolean = true;
  registerForm!: FormGroup;

  constructor(private userService: UserService, private router: Router) {
    this.registerForm = new FormGroup({
      username: new FormControl('', [Validators.required, Validators.minLength(5)]),
      password: new FormControl('', [Validators.required, Validators.minLength(6)])
    });
  }
  hidePassword() {
    this.hide = !this.hide;
  }

  get username() {
    return this.registerForm.get('username');
  }

  get password() {
    return this.registerForm.get('password');
  }


  register() {
    if (!this.registerForm.valid) {
      console.log("No valid data");
      return;
    }
    const userData = this.registerForm.value;
    this.userService.register(userData).pipe(
      catchError((error) => {
        alert('User with that username already exists!');
        return of(null);
      })
    ).subscribe((user) => {
      if (user) {
        alert(`Welcome ${user.username}!`);
        this.router.navigateByUrl('/');
      }
    });
  }

}

