import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Post } from "./post.entity";
import { Comment } from "./comment.entity"


@Entity()
export class User {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ unique: true })
    username: string;

    @Column({ type: 'varchar', length: 255 })
    password: string;

    @OneToMany(() => Post, (post) => post.user, { cascade: true })
    posts: Post[];

    @OneToMany(() => Comment, (comment) => comment.user, { cascade: true })
    comments: Comment[];
}
