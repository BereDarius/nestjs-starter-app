import { BaseEntity } from 'src/config/entities/base.entity';
import { Column, Entity, Unique } from 'typeorm';

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

  @Column({ default: 'user' })
  role: string;
}
