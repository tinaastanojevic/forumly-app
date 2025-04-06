export class Comment {
    text!: string;
    createdAt!: Date;
    username!: string
}


export class Post {
    id!: string;
    title!: string;
    category!: string;
    content!: string;
    createdAt!: Date;
    username!: string;
    likes: number[] = [];
    commentCount!: number;
    edited?: boolean;
    comments!: Comment[];
}
