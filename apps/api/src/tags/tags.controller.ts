import { Body, Controller, Delete, Get, Param, Patch, Post } from '@nestjs/common';
import { CurrentUser, type JwtUserPayload } from '../common/decorators/current-user.decorator';
import { TagsService } from './tags.service';
import { CreateTagDto } from './dto/create-tag.dto';
import { UpdateTagDto } from './dto/update-tag.dto';

@Controller('tags')
export class TagsController {
  constructor(private readonly tags: TagsService) {}

  @Get()
  list(@CurrentUser() user: JwtUserPayload) {
    return this.tags.list(user);
  }

  @Post()
  create(@CurrentUser() user: JwtUserPayload, @Body() dto: CreateTagDto) {
    return this.tags.create(user, dto);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtUserPayload,
    @Param('id') id: string,
    @Body() dto: UpdateTagDto,
  ) {
    return this.tags.update(user, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtUserPayload, @Param('id') id: string) {
    return this.tags.remove(user, id);
  }
}
