/* eslint-disable @typescript-eslint/no-unsafe-return */
/* eslint-disable @typescript-eslint/no-unsafe-member-access */
/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import { Injectable, NotFoundException } from '@nestjs/common';
import { CommentDto, CommentResponse, PostDto, PostResponse } from './dto/post.dto';
import { UsersService } from 'src/users/users.service';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { Post } from 'src/entities/post.entity';
import { Comment } from 'src/entities/comment.entity';

@Injectable()
export class PostsService {

  constructor(private usersService: UsersService, @InjectRepository(Post)
  private postRepository: Repository<Post>, @InjectRepository(Comment)
    private commentRepository: Repository<Comment>) {
  }

  async getAllPosts(): Promise<PostResponse[]> {
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .leftJoin('post.comments', 'comment')
      .select([
        'post.id',
        'post.title',
        'post.category',
        'post.content',
        'post.createdAt',
        'post.likes',
        'post.edited',
        'user.username',
        'COALESCE(COUNT(comment.id), 0) AS commentcount'
      ]).groupBy('post.id, user.username')
      .orderBy("post.createdAt", "DESC")
      .getRawMany();

    if (posts) {
      const postResponse: PostResponse[] = posts.map((post) => ({
        id: post.post_id,
        title: post.post_title,
        category: post.post_category,
        content: post.post_content,
        createdAt: post.post_createdAt,
        username: post.user_username,
        likes: post.post_likes || [],
        commentCount: Number(post.commentcount) ||0,
        edited: post.post_edited
      }))

      return postResponse;
    }
    throw new NotFoundException(`Posts not found`);
  }

  async getPostsByCategory(category: string): Promise<PostResponse[]> {

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .leftJoin('post.comments', 'comment')
      .select([
        'post.id',
        'post.title',
        'post.category',
        'post.content',
        'post.createdAt',
        'post.likes',
        'post.edited',
        'user.username',
        'COALESCE(COUNT(comment.id), 0) AS commentcount'
      ]).where('post.category=:category', { category })
      .groupBy('post.id, user.username')
      .orderBy("post.createdAt", "DESC")
      .getRawMany();

    if (posts) {
      const postResponse: PostResponse[] = posts.map((post) => ({
        id: post.post_id,
        title: post.post_title,
        category: post.post_category,
        content: post.post_content,
        createdAt: post.post_createdAt,
        username: post.user_username,
        likes: post.post_likes || [],
        commentCount: Number(post.commentcount) ||0,
        edited: post.post_edited
      }))

      return postResponse;
    }
    throw new NotFoundException(`Posts not found`);
  }

  async getPostsByUser(userId: string): Promise<PostResponse[]> {
    const userIdNum = Number(userId);
    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .leftJoin('post.comments', 'comment')
      .select([
        'post.id',
        'post.title',
        'post.category',
        'post.content',
        'post.createdAt',
        'post.likes',
        'post.edited',
        'user.username',
        'user.id',
        'COALESCE(COUNT(comment.id), 0) AS commentcount'
      ]).where('user.id=:userIdNum', { userIdNum })
      .groupBy('post.id, user.username, user.id')
      .orderBy("post.createdAt", "DESC")
      .getRawMany();

    if (posts) {
      const postResponse: PostResponse[] = posts.map((post) => ({
        id: post.post_id,
        title: post.post_title,
        category: post.post_category,
        content: post.post_content,
        createdAt: post.post_createdAt,
        username: post.user_username,
        likes: post.post_likes || [],
        commentCount: Number(post.commentcount) || 0,
        edited: post.post_edited
      }))

      return postResponse;
    }
    throw new NotFoundException(`Posts not found`);
  }

  async getAllCategories(): Promise<string[]> {
    const categories = await this.postRepository
      .createQueryBuilder('post')
      .select('DISTINCT post.category')
      .getRawMany();
    return categories.map(category => category.category);
  }

  async getPostWithComments(postId: number): Promise<PostResponse> {
    const post = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .leftJoinAndSelect('post.comments', 'comment')
      .leftJoin('comment.user', 'commentUser')
      .addSelect('user.username')
      .addSelect('commentUser.username')
      .where('post.id= :postId', { postId })
      .getOne();

    if (post) {
      const postResponse: PostResponse = {
        id: post.id,
        title: post.title,
        category: post.category,
        content: post.content,
        createdAt: post.createdAt,
        likes: post.likes,
        edited: post.edited,
        username: post.user.username || '',
        commentCount: post.comments.length || 0,
        comments: post.comments.map((comment) => ({
          text: comment.text,
          createdAt: comment.createdAt,
          username: comment.user.username
        }))

      }
      return postResponse;

    }
    throw new NotFoundException(`Post with ID ${postId} not found`);
  }

  async createPost(postDto: PostDto): Promise<PostResponse> {

    const user = await this.usersService.getUserById(postDto.userId);
    if (!user)
      throw new NotFoundException('User not found');
    const post = this.postRepository.create({ ...postDto, user: user, likes: [], createdAt: new Date(), comments: [] });
    await this.postRepository.save(post);
    const postResponse: PostResponse = {
      ...postDto,
      id: post.id,
      username: user.username,
      likes: [],
      createdAt: post.createdAt,
      commentCount: 0
    }
    return postResponse;
  }

  async deletePost(id: number) {
    const post = await this.postRepository.findOneBy({ id });
    if (!post)
      throw new NotFoundException('Post not found');
    await this.postRepository.remove(post);
    return { message: "Post is deleted!" };
  }

  async likePost(postId: number, userId: number): Promise<number[]> {
    const post = await this.postRepository.findOneBy({ id: postId });
    if (!post)
      throw new NotFoundException('Post not found');

    if (!post.likes.includes(userId))
      post.likes.push(userId);
    else {
      const index = post.likes.indexOf(userId);
      if (index != -1)
        post.likes.splice(index, 1)
    }
    await this.postRepository.save(post);
    return post.likes;
  }

  async addComment(commentDto: CommentDto): Promise<CommentResponse> {
    const post = await this.postRepository.findOne({
      where: { id: commentDto.postId }
    });
    if (!post)
      throw new NotFoundException('Post not found');

    const user = await this.usersService.getUserById(commentDto.userId);
    if (!user)
      throw new NotFoundException('User not found');

    const newComment = this.commentRepository.create(
      {
        text: commentDto.content,
        createdAt: new Date(),
        user: user,
        post: post
      })
    await this.commentRepository.save(newComment);

    return {
      text: newComment.text,
      createdAt: newComment.createdAt,
      username: user.username
    } as CommentResponse;
  }

  async searchPosts(searchText: string): Promise<PostResponse[]> {

    const posts = await this.postRepository
      .createQueryBuilder('post')
      .leftJoin('post.user', 'user')
      .leftJoin('post.comments', 'comment')
      .select([
        'post.id',
        'post.title',
        'post.category',
        'post.content',
        'post.createdAt',
        'post.likes',
        'post.edited',
        'user.username',
        'COALESCE(COUNT(comment.id), 0) AS commentcount'
      ]).where('post.title LIKE :searchText', { searchText: `%${searchText}%` })
      .groupBy('post.id, user.username')
      .orderBy("post.createdAt", "DESC")
      .getRawMany();

    if (posts) {
      const postResponse: PostResponse[] = posts.map((post) => ({
        id: post.post_id,
        title: post.post_title,
        category: post.post_category,
        content: post.post_content,
        createdAt: post.post_createdAt,
        username: post.user_username,
        likes: post.post_likes || [],
        commentCount: post.commentcount,
        edited: post.post_edited
      }))

      return postResponse;
    }
    throw new NotFoundException(`Posts not found`);

  }

  async editPost(postToEdit: PostToEdit) {
    const post = await this.postRepository.findOneBy({ id: postToEdit.postId });
    if (!post)
      throw new NotFoundException('Post not found');

    post.content = postToEdit.content;
    post.edited = true;
    await this.postRepository.save(post);
    return { message: "Post is edited!" };
  }
}
