import { Injectable, NotFoundException } from '@nestjs/common';
import { Auteur } from './entities/auteur.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAuteurDto } from './dto/createAuteurDto';
import { UpdateAuteurDto } from './dto/updateAuteurDto';

@Injectable()
export class AuteurService {
  constructor(
    @InjectRepository(Auteur)
    private readonly auteurRepository: Repository<Auteur>,
  ) {}

  createAuteur(createAuteurDto: CreateAuteurDto): Promise<Auteur> {
    const auteur = this.auteurRepository.create(createAuteurDto);
    return this.auteurRepository.save(auteur);
  }

  findAllAuteur(): Promise<Auteur[]> {
    return this.auteurRepository.find();
  }

  async findOneAuteur(id: number): Promise<Auteur> {
    const auteur = await this.auteurRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('auteur non trouve');
    }

    return auteur;
  }

  async updateAuteur(
    id: number,
    updateAuteurDto: UpdateAuteurDto,
  ): Promise<Auteur> {
    const auteur = await this.auteurRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('Livre non trouvé');
    }

    Object.assign(auteur, updateAuteurDto);

    return this.auteurRepository.save(auteur);
  }

  async deleteAuteur(id: number): Promise<string> {
    const auteur = await this.auteurRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('Auteur non trouvé');
    }

    await this.auteurRepository.remove(auteur);
    return 'author deleted';
  }
}
