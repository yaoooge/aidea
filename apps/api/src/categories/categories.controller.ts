import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser, type JwtUserPayload } from '../common/decorators/current-user.decorator';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';

@Controller('categories')
export class CategoriesController {
  constructor(private readonly categories: CategoriesService) {}

  @Get()
  list(@CurrentUser() user: JwtUserPayload) {
    return this.categories.list(user);
  }

  @Post()
  create(@CurrentUser() user: JwtUserPayload, @Body() dto: CreateCategoryDto) {
    return this.categories.create(user, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtUserPayload,
    @Param('id') id: string,
    @Body() dto: UpdateCategoryDto,
  ) {
    return this.categories.update(user, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtUserPayload, @Param('id') id: string) {
    return this.categories.remove(user, id);
  }
}
