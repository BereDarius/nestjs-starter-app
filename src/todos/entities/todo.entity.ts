import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from 'src/config/entities/base.entity';
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
  @JoinColumn({ name: 'status', referencedColumnName: 'name' })
  status: string;

  @Column()
  @ManyToOne(() => Users, (user) => user.todos, { onDelete: 'CASCADE' })
  @JoinColumn({ name: 'user_id', referencedColumnName: 'id' })
  user_id: string;
}
