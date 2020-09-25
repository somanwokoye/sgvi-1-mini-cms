import { CreateBaseAbstractDto } from 'src/global/create-base-abstract.dto';
import { UpdateProfileDto } from '../update/update-profile.dto';

export class UpdateUserDto extends CreateBaseAbstractDto {
  readonly id: number;
  readonly firstName: string;
  readonly middleName: string;
  readonly lastName: string;
  readonly commonName: string;
  readonly gender: string;
  readonly dateOfBirth: Date;
  readonly isActive: boolean;
  readonly primaryEmailAddress: string;
  readonly profile: UpdateProfileDto;
  //readonly isPrimaryEmailAddressVerified: boolean;
  //readonly passwordSalt: string;
  //readonly passwordHash: string;
  //readonly isPasswordChangeRequired: boolean;
  //readonly resetPasswordToken: string;
  //readonly restPasswordExpiration: Date;
  //readonly primaryEmailVerificationToken: string;
  //readonly otpEnabled: boolean;
  //readonly otpSecret: string;
}
