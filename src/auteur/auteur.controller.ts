import { UpdateAuteurDto } from './dto/updateAuteurDto';
import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { AuteurService } from './auteur.service';
import { CreateAuteurDto } from './dto/createAuteurDto';
import { Auteur } from './entities/auteur.entity';

@Controller('auteur')
export class AuteurController {
  constructor(private readonly auteurService: AuteurService) {}

  @Post()
  createAuteur(@Body() createAuteurDto: CreateAuteurDto): Promise<Auteur> {
    return this.auteurService.createAuteur(createAuteurDto);
  }

  @Get()
  findAllAuteur(): Promise<Auteur[]> {
    return this.auteurService.findAllAuteur();
  }

  @Get(':id')
  findOneAuteur(@Param('id') id: number) {
    return this.auteurService.findOneAuteur(+id);
  }

  @Put(':id')
  UpdateAuteur(
    @Param('id') id: number,
    @Body() updateAuteurDto: UpdateAuteurDto,
  ) {
    return this.auteurService.updateAuteur(+id, updateAuteurDto);
  }

  @Delete(':id')
  DeleteAuteur(@Param('id') id: number) {
    return this.auteurService.deleteAuteur(+id);
  }
}
