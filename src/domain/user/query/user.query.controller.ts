//src/domain/user/query/user.query.controller.ts
import { Controller, Get, UseGuards, Req } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { UserQueryService } from './user.query.service';

@ApiTags('Users')
@ApiBearerAuth()
@Controller('users')
export class UserQueryController {
  constructor(private readonly userQueryService: UserQueryService) {}

  @Get('me')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '내 정보 조회',
    description: '로그인한 사용자의 정보를 조회합니다.',
  })
  async getMe(@Req() req) {
    return this.userQueryService.getMyInfo(req.user.id);
  }
}
