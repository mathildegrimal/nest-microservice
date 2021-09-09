import { IsNotEmpty, IsAlphanumeric, IsNumber } from 'class-validator';

export class UpdateUserDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;

  @IsNotEmpty()
  @IsAlphanumeric()
  firstname: string;

  @IsNotEmpty()
  lastname: string;
}
