import { IsNotEmpty, IsAlphanumeric, IsNumber, IsEmail } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsAlphanumeric()
  firstname: string;

  @IsNotEmpty()
  lastname: string;

  @IsEmail()
  email: string;
}
