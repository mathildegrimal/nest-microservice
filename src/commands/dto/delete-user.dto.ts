import { IsNotEmpty, IsNumber } from 'class-validator';

export class DeleteUserDTO {
  @IsNotEmpty()
  @IsNumber()
  id: number;
}
