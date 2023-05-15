import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { hash, compare } from 'bcrypt';

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  async signUp(email: string, password: string) {
    // See if email in use
    const users = await this.usersService.findUserByEmail(email);
    if (users.length) {
      throw new BadRequestException(`Email already in use`);
    }
    // Hash user's password
    const saltRounds = 10;
    const hashedPassword = await hash(password, saltRounds);
    // Create a new user and save it
    const user = this.usersService.createUser(email, hashedPassword);
    // Return the user
    return user;
  }

  async signIn(email: string, password: string) {
    const [user] = await this.usersService.findUserByEmail(email);
    if (!user) {
      throw new NotFoundException(`User not found`);
    }
    const match = await compare(password, user.password);
    if (match) return user;
    throw new BadRequestException(`Wrong password`);
  }
}
