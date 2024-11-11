import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

export class AdminGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();

    console.log('curr user', request.currentUserMid);
    if (!request.currentUserMid) return false;
    console.log(request.currentUserMid.isAdmin);
    return request.currentUserMid.isAdmin;
  }
}
