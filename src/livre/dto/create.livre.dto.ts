import { IsNotEmpty, IsNumber, IsString } from 'class-validator';

export class CreateLivreDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  description: string;

  @IsString()
  publicationDate: Date;

  @IsNotEmpty()
  @IsNumber()
  auteurId: number;

  @IsNotEmpty()
  @IsNumber()
  categoryId: number;
}
