import { Body, Controller, Get, Patch } from '@nestjs/common';
import { CurrentUser, type JwtUserPayload } from '../common/decorators/current-user.decorator';
import { PatchMeDto } from './dto/patch-me.dto';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private readonly users: UsersService) {}

  @Get('me')
  getMe(@CurrentUser() user: JwtUserPayload) {
    return this.users.getMe(user);
  }

  @Patch('me')
  patchMe(@CurrentUser() user: JwtUserPayload, @Body() dto: PatchMeDto) {
    return this.users.patchMe(user, dto.preferences);
  }
}
