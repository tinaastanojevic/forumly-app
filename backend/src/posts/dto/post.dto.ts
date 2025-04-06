export class PostDto {
    title: string;
    category: string;
    content: string;
    userId: number;
    likes: number = 0;
    commentCount?: number;
}

export class LikeDto {
    postId: number;
    userId: number;
}

export class CommentDto {
    postId: number;
    userId: number;
    content: string;
}

export class PostResponse {
    id: number;
    title: string;
    category: string;
    content: string;
    createdAt: Date;
    username: string;
    likes: number[];
    commentCount: number;
    edited?: boolean;
    comments?: CommentResponse[];
}

export class CommentResponse {
    text: string;
    createdAt: Date;
    username: string;
}