import { IsNotEmpty, MinLength, IsAlphanumeric } from 'class-validator';

export class CreateUserDTO {
  @IsNotEmpty()
  @IsAlphanumeric()
  firstname: string;

  @IsNotEmpty()
  lastname: string;
}
