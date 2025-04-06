import { Component, ElementRef, Input, ViewChild } from '@angular/core';
import { PostService } from '../../services/posts/post.service';
import { UserService } from 'src/app/services/user/user.service';
import { Router } from '@angular/router';
import { MatDialog } from '@angular/material/dialog';
import { DialogContentComponent } from 'src/app/components/dialog-content/dialog-content.component';
import { Post } from 'src/app/services/posts/post';



@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent {
  @Input() posts: Post[] = [];
  @ViewChild('TextareaComment') myTextarea!: ElementRef;
  @ViewChild('TextareaEditPost') textAreaEditPost!: ElementRef;
  editPostId!: string;

  constructor(private postService: PostService, public userService: UserService, public router: Router, public dialog: MatDialog) {
  }

  ngOnInit() {
  }

  likePost(postId: string) {

    if (!this.userService.isAuth()) {

      alert("Login before you like a post!");
      this.router.navigateByUrl('/login');
      return;
    }
    const currentUser = this.userService.currentUser;
    this.postService.likePost({ postId: postId, userId: currentUser.id }).subscribe((likes) => {
      const postIndex = this.posts.findIndex(p => p.id === postId);
      if (postIndex != -1) {
        this.posts[postIndex].likes = likes;
      }
    });
  }

  openCommentPage(postId: string) {
    this.router.navigate(['/comment', postId]);
  }

  addComment(postId: string) {
    const postContent = this.myTextarea.nativeElement.value;
    if (postContent !== "") {
      const currentUser = this.userService.currentUser;
      this.postService.addComment({
        postId: postId,
        userId: currentUser.id,
        content: this.myTextarea.nativeElement.value
      }).subscribe(() => {
        alert("Comment added!");
        this.myTextarea.nativeElement.value = "";
      });
    }
    else
      alert("Comment area is empty!");
  }

  deletePost(postId: string) {
    const dialogRef = this.dialog.open(DialogContentComponent, {
      disableClose: true,
      data: { message: `Are you sure you want to delete this post?` }
    }
    );

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.postService.deletePost(postId).subscribe((message) => {

          const index = this.posts.findIndex(post => post.id === postId);
          if (index !== -1) {
            this.posts.splice(index, 1);
          }
          alert(message.message);
        });
      } else {
        console.log('Action canceled');
      }
    });

  }
  clickedEdit(postId: string) {
    this.editPostId = postId;
  }

  editPost() {
    const newContent = this.textAreaEditPost.nativeElement.value;

    this.postService.editPost(this.editPostId, newContent).subscribe(() => {
      this.editPostId = "";

    });
  }

  cancel() {
    this.editPostId = "";
  }

  seeMore(postContent: HTMLParagraphElement, postId: string) {
    const postToSee = this.posts.find((p) => p.id === postId);
    if (postToSee) {
      postContent.textContent = postToSee.content;
    }

  }
}
