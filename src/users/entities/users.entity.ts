import { Column, Entity, JoinColumn, ManyToOne, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from 'src/config/entities/base.entity';
import { Roles } from 'src/auth/entities/roles.entity';
import { Todos } from 'src/todos/entities/todo.entity';

@Entity()
export class Users extends BaseEntity {
  @Column()
  first_name: string;

  @Column()
  last_name: string;

  @Column()
  @Unique(['username'])
  username: string;

  @Column()
  @Unique(['email'])
  email: string;

  @Column()
  password: string;

  @Column({ default: 'USER' })
  @ManyToOne(() => Roles, role => role.users)
  @JoinColumn({ name: 'role', referencedColumnName: 'name' })
  role: string;

  @OneToMany(() => Todos, todo => todo.user_id)
  todos: Todos[];
}
