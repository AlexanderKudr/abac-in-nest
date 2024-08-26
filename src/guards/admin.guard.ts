import { Injectable, CanActivate, ExecutionContext } from '@nestjs/common';
import { Role } from '../enums/role.enum';

@Injectable()
export class AdminGuard implements CanActivate {
  canActivate(context: ExecutionContext): boolean {
    const request = context.switchToHttp().getRequest();
    const role = request.query.role;

    if (!role || role !== Role.Admin) {
      return false;
    }

    return true;
  }
}
