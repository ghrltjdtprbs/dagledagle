//src/domain/user/query/user.query.controller.ts
import { Controller, Get, UseGuards, Req, Param } from '@nestjs/common';
import { ApiBearerAuth, ApiOperation, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '../../../common/guard/jwt-auth.guard';
import { UserQueryService } from './user.query.service';
import { UserProfileResponseDto } from '../dto/response/user-profile.response.dto';
import { MyInfoResponseDto } from '../dto/response/my-info.response.dto';

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
  async getMe(@Req() req): Promise<MyInfoResponseDto> {
    return this.userQueryService.getMyInfo(req.user.id);
  }
  
  @Get(':id')
  @UseGuards(JwtAuthGuard)
  @ApiOperation({
    summary: '다른 유저 프로필 조회',
    description: '유저 ID로 프로필을 조회합니다. 이메일은 포함되지 않습니다.',
  })
  async getUserProfile(
    @Param('id') id: string,
  ): Promise<UserProfileResponseDto> {
    return this.userQueryService.getUserProfile(+id);
  }
}
