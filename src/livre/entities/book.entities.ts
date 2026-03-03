import { Auteur } from 'src/auteur/entities/auteur.entity';
import { Category } from 'src/category/entites/category.entites';
import { Loan } from 'src/loan/entities/loan.entities';
import {
  Column,
  Entity,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Livre {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  publicationDate: Date;

  @ManyToOne(() => Auteur, (auteur) => auteur.livres)
  auteur: Auteur;

  @ManyToOne(() => Category, (category) => category.livres)
  category: Category;

  @ManyToMany(() => Loan, (loan) => loan.livres)
  loans: Loan[];
}
