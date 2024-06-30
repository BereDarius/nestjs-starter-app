import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from 'src/config/entities/base.entity';
import { Todos } from './todo.entity';

@Entity()
export class TodoStatus extends BaseEntity {
  @Column()
  @Unique(['name'])
  name: string;

  @Column()
  description: string;

  @OneToMany(() => Todos, (todo) => todo.status)
  todos: Todos[];
}
