import { Controller, UseGuards, Request, Post } from '@nestjs/common';
import {
  ApiOkResponse,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';

@Controller()
export class AuthController {
  constructor(private authService: AuthService) {}

  @ApiTags('auth')
  @UseGuards(LocalAuthGuard)
  @Post('auth/signin')
  @ApiOkResponse({ description: 'access-token: a bearer token' })
  @ApiUnauthorizedResponse({
    description: 'You have no permission to this action.',
  })
  async signin(@Request() req: any) {
    return this.authService.signin(req.body);
  }
}
