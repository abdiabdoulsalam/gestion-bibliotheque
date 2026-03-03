import { Module } from '@nestjs/common';
import { AuteurService } from './auteur.service';
import { AuteurController } from './auteur.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Auteur } from './entities/auteur.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Auteur])],
  providers: [AuteurService],
  controllers: [AuteurController],
})
export class AuteurModule {}
