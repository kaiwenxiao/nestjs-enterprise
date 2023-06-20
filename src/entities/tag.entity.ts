import { PrimaryGeneratedColumn, Column, ManyToOne, Entity } from 'typeorm';
import { User } from './user.entity';
@Entity()
export class Tag {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  update_time: number;

  @Column()
  create_time: number;

  @Column()
  state: number;

  @ManyToOne(() => User, (user) => user.tags)
  create_by: User;
}
