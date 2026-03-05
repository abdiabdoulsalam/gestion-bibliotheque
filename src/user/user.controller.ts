import { Controller } from '@nestjs/common';

@Controller('user')
export class UserController {
  // constructor(private readonly userService: UserService) {}
  // @Post()
  // createCategory(@Body() createUserDto: CreateUserDto): Promise<User> {
  //   return this.userService.create(createUserDto);
  // }
  // @Get()
  // findAllCategory(): Promise<User[]> {
  //   return this.userService.findAll();
  // }
  // @Get(':id')
  // findOne(@Param('id') id: number) {
  //   return this.userService.findOne(+id);
  // }
  // @Put(':id')
  // Update(@Param('id') id: number, @Body() updateAuteurDto: UpdateUserDto) {
  //   return this.userService.update(+id, updateAuteurDto);
  // }
  // @Delete(':id')
  // Delete(@Param('id') id: number) {
  //   return this.userService.remove(+id);
  // }
}
