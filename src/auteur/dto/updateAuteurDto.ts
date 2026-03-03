import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateAuteurDto {
  @IsString()
  @IsNotEmpty()
  nom: string;

  @IsString()
  biographie: string;
}
