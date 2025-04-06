import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";
import { Post } from "./post.entity";


@Entity()
export class Comment {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    text: string;

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @ManyToOne(() => User)
    user: User;

    @ManyToOne(() => Post, (post) => post.comments, { onDelete: 'CASCADE' })
    post: Post;

}