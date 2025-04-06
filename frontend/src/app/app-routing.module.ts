import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { UserPostsPageComponent } from './components/user-posts-page/user-posts-page.component';
import { RegisterComponent } from './components/register/register.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { AuthGuard } from './auth/guard/auth.guard';
import { CategoryPageComponent } from './components/category-page/category-page.component';


const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'category/:category', component: CategoryPageComponent },
  { path: 'login', component: LoginComponent },
  { path: 'user', component: UserPostsPageComponent, canActivate: [AuthGuard] },
  { path: 'register', component: RegisterComponent },
  { path: 'comment/:postId', component: PostPageComponent, canActivate: [AuthGuard] },
  { path: '**', redirectTo: '' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
