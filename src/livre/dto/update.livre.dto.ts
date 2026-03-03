import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateLivreDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  publicationDate: Date;
}
