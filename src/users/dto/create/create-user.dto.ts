import { IsEmail, IsNotEmpty } from 'class-validator';
import { CreateBaseAbstractDto } from 'src/global/create-base-abstract.dto';
import { CreateProfileDto } from './create-profile.dto';

export class CreateUserDto extends CreateBaseAbstractDto {
  @IsNotEmpty()
  readonly firstName: string;

  @IsNotEmpty()
  readonly middleName: string;

  @IsNotEmpty()
  readonly lastName: string;
  //readonly commonName: string;

  @IsNotEmpty()
  readonly gender: string;

  @IsNotEmpty()
  readonly dateOfBirth: Date;

  readonly isActive: boolean;

  @IsEmail()
  @IsNotEmpty()
  readonly primaryEmailAddress: string;

  @IsNotEmpty()
  readonly isPrimaryEmailAddressVerified: boolean;

  readonly profile: CreateProfileDto;
  //readonly passwordSalt: string;
  //readonly passwordHash: string;
  //readonly isPasswordChangeRequired: boolean;
  //readonly resetPasswordToken: string;
  //readonly restPasswordExpiration: Date;
  //readonly primaryEmailVerificationToken: string;
  //readonly otpEnabled: boolean;
  //readonly otpSecret: string;
}
