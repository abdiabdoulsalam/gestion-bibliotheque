import { CategoryService } from './category.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { Category } from './entites/category.entites';
import { UpdateCategoryDto } from './dto/updateCategoryDto';
import { CreateCategoryDto } from './dto/createCategoryDto';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  createCategory(
    @Body() createCategoryDto: CreateCategoryDto,
  ): Promise<Category> {
    return this.categoryService.createCategory(createCategoryDto);
  }

  @Get()
  findAllCategory(): Promise<Category[]> {
    return this.categoryService.findAllCategory();
  }

  @Get(':id')
  findOneCategory(@Param('id') id: number) {
    return this.categoryService.findOneCategory(+id);
  }

  @Put(':id')
  UpdateCategory(
    @Param('id') id: number,
    @Body() updateAuteurDto: UpdateCategoryDto,
  ) {
    return this.categoryService.updateCategory(+id, updateAuteurDto);
  }

  @Delete(':id')
  DeleteAuteur(@Param('id') id: number) {
    return this.categoryService.deleteCategory(+id);
  }
}
