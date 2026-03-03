import { IsNumber, IsString } from 'class-validator';

export class CreateLoanDto {
  @IsString()
  loanDate: Date;

  @IsNumber()
  livreIds: number[];
}
