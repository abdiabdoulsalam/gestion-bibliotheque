import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Category } from './entites/category.entites';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from './dto/createCategoryDto';
import { UpdateCategoryDto } from './dto/updateCategoryDto';

@Injectable()
export class CategoryService {
  constructor(
    @InjectRepository(Category)
    private readonly categoryRepository: Repository<Category>,
  ) {}

  createCategory(createCategoryDto: CreateCategoryDto): Promise<Category> {
    const auteur = this.categoryRepository.create(createCategoryDto);
    return this.categoryRepository.save(auteur);
  }

  findAllCategory(): Promise<Category[]> {
    return this.categoryRepository.find();
  }

  async findOneCategory(id: number): Promise<Category> {
    const auteur = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('auteur non trouve');
    }

    return auteur;
  }

  async updateCategory(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const auteur = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('Livre non trouvé');
    }

    Object.assign(auteur, updateCategoryDto);

    return this.categoryRepository.save(auteur);
  }

  async deleteCategory(id: number): Promise<string> {
    const auteur = await this.categoryRepository.findOne({
      where: { id },
    });

    if (!auteur) {
      throw new NotFoundException('Auteur non trouvé');
    }

    await this.categoryRepository.remove(auteur);
    return 'author deleted';
  }
}
