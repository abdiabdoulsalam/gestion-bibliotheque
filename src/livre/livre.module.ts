import { Module } from '@nestjs/common';
import { LivreService } from './livre.service';
import { LivreController } from './livre.controller';
import { Livre } from './entities/book.entities';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auteur } from 'src/auteur/entities/auteur.entity';
import { Category } from 'src/category/entites/category.entites';

@Module({
  imports: [TypeOrmModule.forFeature([Livre, Auteur, Category])],
  providers: [LivreService],
  controllers: [LivreController],
})
export class LivreModule {}
