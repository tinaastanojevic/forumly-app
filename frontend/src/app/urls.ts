const BASE_URL='http://localhost:3000';
export const POSTS_URL=BASE_URL+'/posts';
export const CATEGORIES_URL= POSTS_URL+'/categories';
export const POSTS_BY_CATEGORY_URL=POSTS_URL+'/category/';
export const POSTS_BY_USER_URL=POSTS_URL+'/user/';
export const POST_WITH_COMMENTS_URL=POSTS_URL+'/post/'
export const LIKE_POST_URL=POSTS_URL+'/like';
export const ADD_COMMENT_URL=POSTS_URL+'/comment';
export const DELETE_POST_URL=POSTS_URL+'/'
export const SEARCH_POSTS_URL=POSTS_URL+'/search'
export const SEARCH_CATEGORY_URL=POSTS_URL+'/category/search'
export const UPDATE_POST_URL=POSTS_URL+'/edit'


export const USERS_URL=BASE_URL+'/users';
export const AUTH_URL=BASE_URL+'/auth';
export const LOGIN=AUTH_URL+'/login';
export const REGISTER=AUTH_URL+'/register';
