import { Controller, Get } from '@nestjs/common';
import { CurrentUser, type JwtUserPayload } from '../common/decorators/current-user.decorator';
import { LearningService } from './learning.service';

@Controller('learning')
export class LearningController {
  constructor(private readonly learning: LearningService) {}

  @Get('entry')
  getEntry(@CurrentUser() user: JwtUserPayload) {
    return this.learning.getEntry(user);
  }
}
