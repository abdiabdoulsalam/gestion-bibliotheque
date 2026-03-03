import { Livre } from 'src/livre/entities/book.entities';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Category {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ unique: true })
  nom: string;

  @OneToMany(() => Livre, (livre) => livre.category)
  livres: Livre[];
}
