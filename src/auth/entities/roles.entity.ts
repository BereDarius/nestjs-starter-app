import { Column, Entity, OneToMany, Unique } from 'typeorm';
import { BaseEntity } from 'src/config/entities/base.entity';
import { Users } from '../../users/entities/users.entity';

@Entity()
export class Roles extends BaseEntity {
  @Column()
  @Unique(['name'])
  name: string;

  @OneToMany(() => Users, (user) => user.role)
  users: Users[];
}
