import {
  IsNotEmpty,
  MinLength,
  IsAlphanumeric,
  IsEmail,
} from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;
}
