import { Injectable, NotFoundException } from '@nestjs/common';
import { Loan } from './entities/loan.entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateLoanDto } from './dto/create.loan.dto';
import { Livre } from 'src/livre/entities/book.entities';

@Injectable()
export class LoanService {
  constructor(
    @InjectRepository(Loan)
    private readonly loanRepository: Repository<Loan>,

    @InjectRepository(Livre)
    private readonly livreRepository: Repository<Livre>,
  ) {}

  async createLoan(createLoanDto: CreateLoanDto): Promise<Loan> {
    const { livreIds, ...loandto } = createLoanDto;

    const livres = await this.livreRepository.findByIds(livreIds);

    if (livres.length !== livreIds.length) {
      throw new NotFoundException('un ou plusieurs livres non trouves');
    }

    const loan = this.loanRepository.create({
      ...loandto,
      livres,
    });

    return await this.loanRepository.save(loan);
  }

  findAllLoan(): Promise<Loan[]> {
    return this.loanRepository.find({
      relations: ['livres'],
    });
  }

  async findOneLoan(id: number): Promise<Loan> {
    const auteur = await this.loanRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('auteur non trouve');
    }

    return auteur;
  }

  async deleteLoan(id: number): Promise<string> {
    const auteur = await this.loanRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('Auteur non trouvé');
    }

    await this.loanRepository.remove(auteur);
    return 'author deleted';
  }
}
