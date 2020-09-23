import { BaseAbstractEntity } from 'src/global/base-abstract.entity';
import { Column, Entity, JoinTable, ManyToMany } from 'typeorm';
import { Role } from '../../roles/models/role.entity';

@Entity()
export class Permission extends BaseAbstractEntity {
  @Column()
  name: string;

  @Column()
  description: string;

  @JoinTable()
  @ManyToMany(type => Role)
  role: Role;
}
