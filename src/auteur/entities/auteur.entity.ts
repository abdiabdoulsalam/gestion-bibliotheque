import { Livre } from 'src/livre/entities/book.entities';
import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';

@Entity()
export class Auteur {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nom: string;

  @Column({ nullable: true })
  biographie: string;

  @OneToMany(() => Livre, (livre) => livre.auteur)
  livres: Livre[];
}
