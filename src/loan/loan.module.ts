import { Module } from '@nestjs/common';
import { LoanService } from './loan.service';
import { LoanController } from './loan.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Loan } from './entities/loan.entities';
import { Livre } from 'src/livre/entities/book.entities';

@Module({
  imports: [TypeOrmModule.forFeature([Loan, Livre])],
  providers: [LoanService],
  controllers: [LoanController],
})
export class LoanModule {}
