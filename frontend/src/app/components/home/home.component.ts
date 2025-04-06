import { Component } from '@angular/core';
import { PostService } from '../../services/posts/post.service';
import { Post } from '../../services/posts/post';
import { Router } from '@angular/router';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { UserService } from '../../services/user/user.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent {
  posts$: Observable<Post[]>;
  category: string | null = null;
  postContent!: string;
  searchText: string = "";
  createPostForm!: FormGroup;

  constructor(private postService: PostService, private userService: UserService, private router: Router) {
    this.postService.getAllPosts().subscribe();
    this.posts$ = this.postService.postObservable;
    this.createPostForm = new FormGroup({
      title: new FormControl('', Validators.required),
      category: new FormControl('', Validators.required),
      content: new FormControl('', Validators.required)
    });

  }

  ngOnInit() {
  }

  get title() {
    return this.createPostForm.get('title');
  }

  get categoryFc() {
    return this.createPostForm.get('category');
  }

  get content() {
    return this.createPostForm.get('content');
  }

  createPost() {

    const user = this.userService.currentUser;
    if (Object.keys(user).length === 0) {

      alert("Login before you create a post!");
      this.router.navigateByUrl('/login');
      return;
    }
    else if (this.createPostForm.valid) {
        this.postService.createNewPost({
          title: this.title?.value,
          category: this.categoryFc?.value,
          content: this.content?.value,
          userId: user.id
        }).subscribe(() => {
          alert("Post created!");
          this.clearInputs();
        });
      }
  }

  clearInputs() {
    this.title?.reset('', { emitEvent: false });
    this.categoryFc?.reset('', { emitEvent: false });
    this.content?.reset('', { emitEvent: false });
    this.title?.markAsUntouched();
    this.title?.markAsPristine();
  }
}
