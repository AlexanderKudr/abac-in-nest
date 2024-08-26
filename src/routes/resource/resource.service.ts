import { Injectable } from '@nestjs/common';

@Injectable()
export class ResourceService {
  getResource(): string {
    return 'Private Resource - Admin';
  }
}
