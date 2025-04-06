import { Component } from '@angular/core';
import { PostService } from '../../services/posts/post.service';
import { Router } from '@angular/router';
import { User } from '../../services/user/user';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent {
  categories$!: Observable<string[]>;
  user$!: Observable<User>;
  searchText: string = "";

  constructor(private postService: PostService, private userService: UserService, private router: Router) {
  
    this.postService.getAllCategories().subscribe();
    this.categories$ = this.postService.categoriesObservable;
    this.user$ = this.userService.userObservable;
  }

  getAllCategories() {

  }

  openCategory(category: string) {
    this.router.navigate(['category', category]);
  }

  get isAuth() {
    return this.userService.isAuth();
  }

  logout() {
    this.userService.logout();
  }

  onEnterClick() {
    this.search();
  }

  search() {
    this.postService.searchPosts(this.searchText).subscribe(
      () => {
        this.router.navigateByUrl('/');
      }
    );
  }

}
