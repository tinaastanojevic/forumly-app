import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, catchError, Observable, tap, throwError } from 'rxjs';
import { LOGIN, REGISTER } from '../../urls';
import { User } from './user';
import { IUser } from './IUser';

const USER_KEY = 'User';
@Injectable({
  providedIn: 'root'
})
export class UserService {
  private logoutTimer: any;
  private userSubject = new BehaviorSubject<User>(this.getUserFromLocalStorage());
  public userObservable: Observable<User>;

  constructor(private httpClient: HttpClient) {
    this.userObservable = this.userSubject.asObservable();
    this.autoLogin();
  }

  login(iUser: IUser): Observable<User> {
    return this.httpClient.post<User>(LOGIN, iUser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.autoLogout();
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    );
  }
  register(iUser: IUser): Observable<User> {
    return this.httpClient.post<User>(REGISTER, iUser).pipe(
      tap({
        next: (user) => {
          this.setUserToLocalStorage(user);
          this.userSubject.next(user);
          this.autoLogout();
        }
      }),
      catchError((error) => {
        return throwError(() => new Error(error.message));
      })
    )
  }

  logout() {
    this.userSubject.next(new User());
    localStorage.removeItem(USER_KEY);
    clearTimeout(this.logoutTimer);
    alert(`Logout successfull`);
    window.location.reload();
  }

  private setUserToLocalStorage(user: User) {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  }

  private getUserFromLocalStorage(): User {
    const userJson = localStorage.getItem(USER_KEY);
    if (userJson) return JSON.parse(userJson) as User;
    return new User();
  }

  public get currentUser(): User {
    return this.userSubject.value;
  }

  isAuth(): boolean {
    if (this.currentUser.token) return true;
    else return false;
  }

  autoLogin() {
    if (this.currentUser.id)
      this.autoLogout();
  }

  autoLogout(): void {
    const token = this.currentUser.token;
    if (!token) return;

    const tokenPayload = JSON.parse(atob(token.split('.')[1]));
    const expiresIn = tokenPayload.exp * 1000 - Date.now();
    if (expiresIn <= 0) {
      this.logout();
      return;
    }
    console.log(`Token expires in ${(expiresIn / 1000/60).toFixed(0)} minutes...`);

    this.logoutTimer = setTimeout(() => this.logout(), expiresIn);

  }
}
