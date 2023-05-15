import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Query,
  Param,
  Session,
  UseGuards,
} from '@nestjs/common';
import { CreateUserDto } from './dtos/create-user.dto';
import { UsersService } from './users.service';
import { UpdateUserDto } from './dtos/update-user.dto';
import { Serialize } from 'src/interceptors/serialize.interceptor';
import { UserDto } from './dtos/user.dto';
import { AuthService } from './auth.service';
import { CurrentUser } from './decorators/current-user.decorator';
import { User } from './users.entity';
import { AuthGuard } from 'src/guards/auth.guard';

// Intercepts requests coming to this route handler
@Controller('auth')
@Serialize(UserDto)
export class UsersController {
  constructor(
    private usersService: UsersService,
    private authService: AuthService,
  ) {}

  @Get('/whoami')
  @UseGuards(AuthGuard)
  whoAmI(@CurrentUser() user: User) {
    return user;
  }

  // @Get('/whoami')
  // whoAmI(@Session() session: any) {
  //   return this.usersService.findUserById(session.userId);
  // }

  @Post('/signout')
  async signOutUser(@Session() session: any) {
    session.userId = null;
  }

  @Post('/signup')
  async createUser(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signUp(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  @Post('/signin')
  async signIn(@Body() body: CreateUserDto, @Session() session: any) {
    const user = await this.authService.signIn(body.email, body.password);
    session.userId = user.id;
    return user;
  }

  // @UseInterceptors(SerializeInterceptor)
  @Get('/:id')
  findUser(@Param('id') id: string) {
    return this.usersService.findUserById(+id);
  }

  @Get()
  findAllUsers(@Query('email') email: string) {
    return this.usersService.findUserByEmail(email);
  }

  @Delete('/:id')
  removeUser(@Param('id') id: string) {
    return this.usersService.removeUser(+id);
  }

  @Patch('/:id')
  updateUser(@Param('id') id: string, @Body() body: UpdateUserDto) {
    return this.usersService.updateUser(+id, body);
  }
}
