import { Livre } from 'src/livre/entities/book.entities';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Loan {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  loanDate: Date;

  @ManyToMany(() => Livre, (livre) => livre.loans)
  @JoinTable()
  livres: Livre[];
}
