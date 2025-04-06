import { Component } from '@angular/core';
import { Post } from '../../services/posts/post';
import { PostService } from '../../services/posts/post.service';
import { UserService } from '../../services/user/user.service';
import { Observable, switchMap } from 'rxjs';
import { User } from 'src/app/services/user/user';

@Component({
  selector: 'app-user-posts-page',
  templateUrl: './user-posts-page.component.html',
  styleUrls: ['./user-posts-page.component.css']
})
export class UserPostsPageComponent {
  posts$: Observable<Post[]>;
  user: User;
  constructor(private postService: PostService, private userService: UserService) {
    this.user = this.userService.currentUser;
    this.posts$ = this.postService.getPostsByUser(this.user.id);
  }
}
