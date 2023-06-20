import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { User } from './user.entity';
import { Tag } from './tag.entity';

@Entity()
export class Article {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  title: string;

  @Column('int')
  create_time: number;

  @Column('int')
  update_time: number;

  @Column('varchar')
  content: string;

  @Column('varchar')
  desc: string;

  @Column('varchar')
  cover_image_url: string;

  @Column('int')
  state: number;

  @ManyToOne(() => User, (user) => user.tags)
  create_by: User;

  @ManyToMany(() => Tag, (tag) => tag.id)
  // @JoinTable需要指定这是关系的所有者方。
  @JoinTable()
  tags: Tag[];
}
