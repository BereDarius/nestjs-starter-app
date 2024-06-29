import { BaseEntity } from 'src/config/entities/base.entity';
import { Column, Entity, ManyToOne } from 'typeorm';
import { TodoStatus } from './todo-status.entity';
import { Users } from 'src/users/entities/users.entity';

@Entity()
export class Todos extends BaseEntity {
  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  due_date: Date;

  @Column({ default: 'PENDING' })
  @ManyToOne(() => TodoStatus, (status) => status.todos)
  status: string;

  @ManyToOne(() => Users, (user) => user.todos, { onDelete: 'CASCADE' })
  user: string;
}
