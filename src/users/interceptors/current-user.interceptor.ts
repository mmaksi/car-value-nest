import {
  UseInterceptors,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Injectable,
} from '@nestjs/common';
import { UsersService } from '../users.service';

interface ClassConstructor {
  new (...args: any[]);
}

// Custom decorator
// export function Serialize(dto: ClassConstructor) {
//   return UseInterceptors(new SerializeInterceptor(dto));
// }

@Injectable()
export class CurrentUserInterceptor implements NestInterceptor {
  constructor(private usersService: UsersService) {}

  async intercept(context: ExecutionContext, handler: CallHandler) {
    const request = context.switchToHttp().getRequest();
    const { userId } = request.session;

    if (userId) {
      const user = await this.usersService.findUserById(userId);
      request.currentUser = user;
      console.log({ user });
    }
    return handler.handle();
  }
}
