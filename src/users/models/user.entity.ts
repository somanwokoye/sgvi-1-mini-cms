import { BaseAbstractEntity } from 'src/global/base-abstract.entity';
import { Column, Entity, ManyToMany, OneToOne } from 'typeorm';
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

  @Column({ nullable: true })
  commonName: string;

  @Column()
  gender: string;

  @Column()
  dateOfBirth: Date;

  @Column()
  isActive: boolean;

  @Column({ unique: true })
  primaryEmailAddress: string;

  @Column({ nullable: true })
  isPrimaryEmailAddressVerified: boolean;

  @Column({ nullable: true })
  passwordSalt: string;

  @Column({ nullable: true })
  passwordHash: string;

  @Column({ nullable: true })
  isPasswordChangeRequired: boolean;

  @Column({ nullable: true })
  resetPasswordToken: string;

  @Column({ nullable: true })
  restPasswordExpiration: Date;

  @Column({ nullable: true })
  primaryEmailVerificationToken: string;

  @Column({ nullable: true })
  otpEnabled: boolean;

  @Column({ nullable: true })
  otpSecret: string;

  @OneToOne(
    type => Profile,
    profile => profile.user,
    { cascade: true },
  )
  profile: Profile;

  @ManyToMany(type => Role)
  role: Role;
}
