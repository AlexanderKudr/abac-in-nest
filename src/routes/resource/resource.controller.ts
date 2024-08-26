import { Controller, Get, Query, UseGuards } from '@nestjs/common';
import { ResourceService } from './resource.service';

import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import { AdminGuard } from '../../guards/admin.guard';

@Controller('resource')
@ApiTags('resource')
export class ResourceController {
  constructor(private readonly resourceService: ResourceService) {}

  @ApiOkResponse()
  @ApiForbiddenResponse()
  @UseGuards(AdminGuard)
  @Get()
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  getResource(@Query('role') _role: string): string {
    return this.resourceService.getResource();
  }
}
