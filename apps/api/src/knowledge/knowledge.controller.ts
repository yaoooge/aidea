import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { CurrentUser, type JwtUserPayload } from '../common/decorators/current-user.decorator';
import { KnowledgeService } from './knowledge.service';
import { CreateKnowledgeDto } from './dto/create-knowledge.dto';
import { UpdateKnowledgeDto } from './dto/update-knowledge.dto';
import { ListKnowledgeQueryDto } from './dto/list-knowledge.query';

@Controller('knowledge')
export class KnowledgeController {
  constructor(private readonly knowledge: KnowledgeService) {}

  @Get()
  list(@CurrentUser() user: JwtUserPayload, @Query() query: ListKnowledgeQueryDto) {
    return this.knowledge.list(user, query);
  }

  @Post()
  create(@CurrentUser() user: JwtUserPayload, @Body() dto: CreateKnowledgeDto) {
    return this.knowledge.create(user, dto);
  }

  @Get(':id')
  getOne(@CurrentUser() user: JwtUserPayload, @Param('id') id: string) {
    return this.knowledge.getById(user, id);
  }

  @Patch(':id')
  update(
    @CurrentUser() user: JwtUserPayload,
    @Param('id') id: string,
    @Body() dto: UpdateKnowledgeDto,
  ) {
    return this.knowledge.update(user, id, dto);
  }

  @Delete(':id')
  remove(@CurrentUser() user: JwtUserPayload, @Param('id') id: string) {
    return this.knowledge.remove(user, id);
  }
}
