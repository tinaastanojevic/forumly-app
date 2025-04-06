import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, OneToMany } from 'typeorm';
import { User } from './user.entity';
import { Comment } from './comment.entity';

@Entity()
export class Post {

    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    title: string;

    @Column()
    category: string;

    @Column()
    content: string;

    @Column("int", { array: true })
    likes: number[] = [];

    @Column({ type: 'timestamp' })
    createdAt: Date;

    @Column({ type: "boolean", default: false })
    edited?: boolean;

    @ManyToOne(() => User, (user) => user.posts)
    user: User;

    @OneToMany(() => Comment, (comment) => comment.post, { cascade: true })
    comments: Comment[];


}