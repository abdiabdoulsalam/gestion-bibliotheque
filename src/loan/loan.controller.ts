import { LoanService } from './loan.service';
import { Controller } from '@nestjs/common';
import { Body, Delete, Get, Param, Post } from '@nestjs/common';
import { CreateLoanDto } from './dto/create.loan.dto';
import { Loan } from './entities/loan.entities';

@Controller('loan')
export class LoanController {
  constructor(private readonly LoanService: LoanService) {}

  @Post()
  createCategory(@Body() createCategoryDto: CreateLoanDto): Promise<Loan> {
    return this.LoanService.createLoan(createCategoryDto);
  }

  @Get()
  findAllCategory(): Promise<Loan[]> {
    return this.LoanService.findAllLoan();
  }

  @Get(':id')
  findOneCategory(@Param('id') id: number) {
    return this.LoanService.findOneLoan(+id);
  }

  @Delete(':id')
  DeleteAuteur(@Param('id') id: number) {
    return this.LoanService.deleteLoan(+id);
  }
}
