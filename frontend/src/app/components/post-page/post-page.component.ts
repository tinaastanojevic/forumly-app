import { Component } from '@angular/core';
import { PostService } from '../../services/posts/post.service';
import { ActivatedRoute } from '@angular/router';
import { Post } from '../../services/posts/post';
import { map, Observable } from 'rxjs';

@Component({
  selector: 'app-post-page',
  templateUrl: './post-page.component.html',
  styleUrls: ['./post-page.component.css']
})
export class PostPageComponent {
  constructor(private postService: PostService, private route: ActivatedRoute) { }
  posts$!: Observable<Post[]>
  postId!: string;

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.postId = params['postId'];
      this.posts$ = this.postService.getPostWithComments(this.postId).pipe(
        map(post => [post])
      );

    });
  }

}
