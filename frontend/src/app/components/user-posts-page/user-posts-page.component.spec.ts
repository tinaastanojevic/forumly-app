import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UserPostsPageComponent } from './user-posts-page.component';

describe('UserPostsPageComponent', () => {
  let component: UserPostsPageComponent;
  let fixture: ComponentFixture<UserPostsPageComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UserPostsPageComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(UserPostsPageComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
