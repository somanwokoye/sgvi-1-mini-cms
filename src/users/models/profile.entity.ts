import { type } from 'os';
import { BaseAbstractEntity } from 'src/global/base-abstract.entity';
import { Entity, Column, OneToOne } from 'typeorm';
import { User } from './user.entity';

@Entity()
export class Profile extends BaseAbstractEntity {
  @Column()
  homeAddress: string;

  @Column()
  Nationality: string;

  @Column()
  stateOfOrigin: string;

  @Column()
  photo: string; //photo id

  @OneToOne(
    type => User,
    user => user.profile,
  )
  user: User;
}
