import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Comment, Post } from './post';
import { ADD_COMMENT_URL, CATEGORIES_URL, DELETE_POST_URL, LIKE_POST_URL, POST_WITH_COMMENTS_URL, POSTS_BY_CATEGORY_URL, POSTS_BY_USER_URL, POSTS_URL, SEARCH_CATEGORY_URL, SEARCH_POSTS_URL, UPDATE_POST_URL } from '../../urls';
import { BehaviorSubject, Observable, tap } from 'rxjs';
import { UserService } from '../user/user.service';
import { IPost } from './IPost';
import { PostActionRequest } from './PostActionRequest';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postSubject = new BehaviorSubject<Post[]>([]);
  public postObservable: Observable<Post[]>;
  public categorieSubject = new BehaviorSubject<string[]>([]);
  public categoriesObservable: Observable<string[]>;

  constructor(private http: HttpClient, private userService: UserService) {
    this.postObservable = this.postSubject.asObservable();
    this.categoriesObservable = this.categorieSubject.asObservable();
  }

  getAllPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(POSTS_URL).pipe(
      tap({
        next: (posts) => {
          this.postSubject.next(posts);
        }
      })
    )
  }

  getAllCategories(): Observable<string[]> {
    return this.http.get<string[]>(CATEGORIES_URL).pipe(
      tap({
        next: (categories) => {
          this.categorieSubject.next(categories);
        }
      })
    );
  }

  getPostsByCategory(category: string): Observable<Post[]> {
    return this.http.get<Post[]>(POSTS_BY_CATEGORY_URL + category).pipe(
      tap({
        next: (posts) => {
          this.postSubject.next(posts);
        }
      })
    );
  }

  createNewPost(IPost: IPost): Observable<Post> {
    return this.http.post<Post>(POSTS_URL, IPost).pipe(
      tap({
        next: (newPost) => {
          const currentPosts = this.postSubject.getValue();
          currentPosts.unshift(newPost);
          this.postSubject.next(currentPosts);
          let currentCategories = this.categorieSubject.getValue();
          if (!currentCategories.includes(newPost.category)) {
            currentCategories.push(newPost.category);
            this.categorieSubject.next(currentCategories);
          }
        }
      })
    )
  }

  getPostsByUser(userId: string): Observable<Post[]> {
    return this.http.get<Post[]>(POSTS_BY_USER_URL + userId);
  }

  getPostWithComments(postId: string) {
    return this.http.get<Post>(POST_WITH_COMMENTS_URL + postId)
      .pipe(
        tap({
          next: (post) => {
            this.postSubject.next([post]);
          }
        })
      );
  }

  likePost(data: PostActionRequest): Observable<number[]> {
    return this.http.post<number[]>(LIKE_POST_URL, data);
  }

  addComment(data: PostActionRequest): Observable<Comment> {
    return this.http.post<Comment>(ADD_COMMENT_URL, data).pipe(
      tap({
        next: (comment) => {
          const posts = this.postSubject.getValue();
          const post = posts.find(p => p.id === data.postId);
          if (post) {
            post.comments.unshift(comment);
            post.commentCount++;
            this.postSubject.next(posts);
          }
        }
      }));
  }

  deletePost(postId: string) {
    return this.http.delete<{ message: string }>(DELETE_POST_URL + postId).pipe(
      tap({
        next: () => {
          const posts = this.postSubject.getValue();
          const postForDeleteIndex = posts.findIndex(p => p.id === postId);
          posts.splice(postForDeleteIndex, 1);
          this.postSubject.next(posts);
        }
      })
    );
  }

  searchPosts(searchText: string): Observable<Post[]> {
    return this.http.get<Post[]>(`${SEARCH_POSTS_URL}?searchText=${searchText}`).pipe(
      tap({
        next: (posts) => {
          this.postSubject.next(posts);
        }
      })
    );
  }

  editPost(postId: string, newContent: string) {
    return this.http.patch<{ message: string }>(UPDATE_POST_URL, { postId: postId, content: newContent, userId: this.userService.currentUser.id }).pipe(
      tap({
        next: (message) => {
          const posts = this.postSubject.getValue();
          const postForEdit = posts.find(p => p.id === postId);
          if (postForEdit) {
            postForEdit.content = newContent;
            postForEdit.edited = true;
          }
          this.postSubject.next(posts);
          alert(message.message);
        }
      })
    );
  }
}
