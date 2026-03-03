import { IsNotEmpty, IsString } from 'class-validator';

export class CreateAuteurDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  biographie: string;
}
