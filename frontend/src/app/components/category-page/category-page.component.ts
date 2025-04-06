import { Component } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Observable, of } from 'rxjs';
import { Post } from 'src/app/services/posts/post';
import { PostService } from 'src/app/services/posts/post.service';

@Component({
  selector: 'app-category-page',
  templateUrl: './category-page.component.html',
  styleUrls: ['./category-page.component.css']
})
export class CategoryPageComponent {
  posts$: Observable<Post[]> = of([]);
  category!: string;
  constructor(private postService: PostService, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      this.category = params.get('category') ?? '';
      this.posts$ = this.postService.getPostsByCategory(this.category);
    })
  }

}
