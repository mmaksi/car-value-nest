import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    // Add your access control logic here
    // For example, you can check if the user has the necessary role or permission to access the route handler
    const request = context.switchToHttp().getRequest();
    // Check if the user has access based on your custom conditions
    return request.session.userId;
  }
}
