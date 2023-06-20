import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Tag } from './tag.entity';
import { Article } from './article.entity';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  username: string;

  @Column()
  password: string;

  @Column()
  update_time: number;

  @Column()
  create_time: number;

  @Column()
  state: number;

  @OneToMany(() => Tag, (tag) => tag.create_by)
  tags: Tag[];

  @OneToMany(() => Article, (article) => article.create_by)
  articles: Article[];
}
