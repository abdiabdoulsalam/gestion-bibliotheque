import { Auteur } from 'src/auteur/entities/auteur.entity';
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Livre } from './entities/book.entities';
import { Repository } from 'typeorm';
import { CreateLivreDto } from './dto/create.livre.dto';
import { UpdateLivreDto } from './dto/update.livre.dto';
import { Category } from 'src/category/entites/category.entites';

@Injectable()
export class LivreService {
  constructor(
    @InjectRepository(Livre)
    private readonly livreRepository: Repository<Livre>,

    @InjectRepository(Auteur)
    private readonly auteurRepository: Repository<Auteur>,

    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  // Creer unn livre
  async create(createLivreDto: CreateLivreDto): Promise<Livre> {
    const { auteurId, categoryId, ...livreDto } = createLivreDto;

    const auteur = await this.auteurRepository.findOne({
      where: { id: auteurId },
    });

    if (!auteur) {
      throw new NotFoundException('Auteur non trouve');
    }

    const category = await this.categoryRepository.findOne({
      where: { id: categoryId },
    });

    if (!category) {
      throw new NotFoundException('category not found');
    }

    const livre = this.livreRepository.create({
      ...livreDto,
      auteur,
      category,
    });

    return this.livreRepository.save(livre);
  }

  // Get books
  findAll(): Promise<Livre[]> {
    return this.livreRepository.find({
      relations: ['auteur', 'category', 'loans'],
    });
  }

  // Get find one
  async findOne(id: number): Promise<Livre> {
    const livre = await this.livreRepository.findOne({
      where: { id },
    });

    if (!livre) {
      throw new NotFoundException('Livre non trouvé');
    }

    return livre;
  }

  // Update livre
  async update(id: number, updateLivreDto: UpdateLivreDto): Promise<Livre> {
    const livre = await this.livreRepository.findOne({
      where: { id },
    });

    if (!livre) {
      throw new NotFoundException('Livre non trouvé');
    }

    Object.assign(livre, updateLivreDto);

    return this.livreRepository.save(livre);
  }

  // remove book
  async remove(id: number): Promise<string> {
    const livre = await this.livreRepository.findOne({
      where: { id },
    });

    if (!livre) {
      throw new NotFoundException('Livre non trouvé');
    }

    await this.livreRepository.remove(livre);
    return 'book deleted';
  }
}
