import {
  Body,
  ConflictException,
  Controller,
  Param,
  Patch,
  Post,
} from '@nestjs/common';

import { UserRole } from './data-access';
import { AuthService } from './auth.service';

export class SignUpDTO {
  username: string;
  password: string;
  role: UserRole;
}

class SignInDTO {
  username: string;
  password: string;
}
@Controller()
export class AppController {
  constructor(private auth: AuthService) {}

  @Post('signup')
  async signup(@Body() dto: SignUpDTO) {
    const exists = await this.auth.findByUsername(dto.username);

    if (exists) {
      throw new ConflictException('Already exsits');
    }

    return this.auth.signup(dto);
  }

  @Post('signin')
  sigin(@Body() { username, password }: SignInDTO) {
    return this.auth.signin(username, password);
  }

  @Patch('users/:id/role')
  changeRole(@Param('id') id: string, @Body('role') newRole: UserRole) {
    return this.auth.changeRole(id, newRole);
  }

  @Post('verify')
  verify(@Body('jwt') jwt: string) {
    return this.auth.verify(jwt);
  }
}
