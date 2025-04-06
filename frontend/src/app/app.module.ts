import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { PostComponent } from './components/post/post.component';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { NavbarComponent } from './components/navbar/navbar.component';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HomeComponent } from './components/home/home.component';
import { FormsModule } from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { MatIconModule } from '@angular/material/icon';
import { ReactiveFormsModule } from '@angular/forms';
import { UserPostsPageComponent } from './components/user-posts-page/user-posts-page.component';
import { RegisterComponent } from './components/register/register.component';
import { PostPageComponent } from './components/post-page/post-page.component';
import { MatDialogModule } from '@angular/material/dialog';
import { DialogContentComponent } from './components/dialog-content/dialog-content.component';
import { AuthInterceptor } from './auth/auth.interceptor';
import { CategoryPageComponent } from './components/category-page/category-page.component';
import { TruncatePipe } from './pipes/truncate.pipe';



@NgModule({
  declarations: [
    AppComponent,
    PostComponent,
    NavbarComponent,
    HomeComponent,
    LoginComponent,
    UserPostsPageComponent,
    RegisterComponent,
    PostPageComponent,
    DialogContentComponent,
    CategoryPageComponent,
    TruncatePipe,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatButtonModule,
    MatCardModule,
    MatToolbarModule,
    MatMenuModule,
    MatFormFieldModule,
    MatInputModule,
    HttpClientModule,
    FormsModule,
    MatIconModule,
    ReactiveFormsModule,
    MatDialogModule
  ],
  providers: [{
    provide: HTTP_INTERCEPTORS,
    useClass: AuthInterceptor,
    multi: true
  }],
  bootstrap: [AppComponent]
})
export class AppModule { }
