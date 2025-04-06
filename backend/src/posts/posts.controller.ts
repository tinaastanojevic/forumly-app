import { Body, Controller, Delete, Get, Param, Patch, Post, Query, UseGuards } from '@nestjs/common';
import { PostsService } from './posts.service';
import { CommentDto, CommentResponse, LikeDto, PostDto, PostResponse } from './dto/post.dto';
import { AuthGuard } from 'src/auth/guard/auth.guard';

@Controller('posts')
export class PostsController {
    constructor(private readonly postsService: PostsService) { }

    @Get()
    getAllPosts(): Promise<PostResponse[]> {
        return this.postsService.getAllPosts();
    }

    @Get('category/:category')
    getPostsByCategory(@Param('category') category: string): Promise<PostResponse[]> {
        return this.postsService.getPostsByCategory(category);
    }

    @UseGuards(AuthGuard)
    @Get('user/:userId')
    getPostsByUser(@Param('userId') userId: string): Promise<PostResponse[]> {
        return this.postsService.getPostsByUser(userId);
    }

    @Get('/categories')
    getAllCategories(): Promise<string[]> {
        return this.postsService.getAllCategories();
    }

    @Get('post/:postId')
    getPostWithComments(@Param('postId') postId: string): Promise<PostResponse> {
        const postIdNum = Number(postId);
        return this.postsService.getPostWithComments(postIdNum);
    }

    @Get('/search')
    searchPosts(@Query('searchText') searchText: string): Promise<PostResponse[]> {
        if (!searchText) {
            return this.postsService.getAllPosts();
        }
        return this.postsService.searchPosts(searchText);
    }

    @UseGuards(AuthGuard)
    @Post()
    createPost(@Body() postDto: PostDto): Promise<PostResponse> {
        return this.postsService.createPost(postDto);
    }

    @UseGuards(AuthGuard)
    @Post('like')
    likePost(@Body() likeDto: LikeDto): Promise<number[]> {
        return this.postsService.likePost(likeDto.postId, likeDto.userId);
    }

    @UseGuards(AuthGuard)
    @Post('comment')
    addComment(@Body() commentDto: CommentDto): Promise<CommentResponse> {
        return this.postsService.addComment(commentDto);
    }

    @UseGuards(AuthGuard)
    @Patch('edit')
    editPost(@Body() postToEdit: PostToEdit) {
        return this.postsService.editPost(postToEdit);
    }

    @UseGuards(AuthGuard)
    @Delete(':id')
    deletePostById(@Param('id') id: string) {
        const postId = Number(id);
        return this.postsService.deletePost(postId);
    }
}
