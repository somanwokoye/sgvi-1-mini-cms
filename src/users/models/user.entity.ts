import { BaseAbstractEntity } from 'src/global/base-abstract.entity';
import { Column, Entity, JoinColumn, ManyToMany, OneToOne } from 'typeorm';
import { Profile } from './profile.entity';
import { Role } from '../modules/roles/models/role.entity';

@Entity()
export class User extends BaseAbstractEntity {
  @Column()
  firstName: string;

  @Column()
  middleName: string;

  @Column()
  lastName: string;

  @Column()
  commonName: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  isActive: boolean;

  @Column({ unique: true })
  primaryEmailAddress: string;

  @Column()
  isPrimaryEmailAddressVerified: boolean;

  @Column()
  passwordSalt: string;

  @Column()
  passwordHash: string;

  @Column()
  isPasswordChangeRequired: boolean;

  @Column()
  resetPasswordToken: string;

  @Column()
  restPasswordExpiration: Date;

  @Column()
  primaryEmailVerificationToken: string;

  @Column()
  otpEnabled: boolean;

  @Column()
  otpSecret: string;

  @JoinColumn()
  @OneToOne(
    type => Profile,
    profile => profile.user,
  )
  profile: Profile;

  @ManyToMany(type => Role)
  role: Role;
}
