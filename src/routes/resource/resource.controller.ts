import { Controller, ForbiddenException, Get, Query } from '@nestjs/common';
import { ResourceService } from './resource.service';

import { ApiForbiddenResponse, ApiOkResponse, ApiTags } from '@nestjs/swagger';
import {
  CaslAbilityFactory,
  Project,
} from '../../factories/casl/casl-ability.factory';
import { UsersDto } from './dto/users.dto';
import { Action } from '../../enums/action.enum';

@Controller('resource')
@ApiTags('resource')
export class ResourceController {
  constructor(
    private readonly resourceService: ResourceService,
    private caslAbilityFactory: CaslAbilityFactory,
  ) {}

  @ApiOkResponse()
  @ApiForbiddenResponse()
  @Get()
  getResource(
    @Query('id') id: string,
    @Query('name') name: string,
    @Query('role') role: string,
  ): string {
    const user: UsersDto = { id, name, role };
    const ability = this.caslAbilityFactory.createForUser(user);

    if (ability.can(Action.Read, Project)) {
      return this.resourceService.getResource();
    } else if (ability.cannot(Action.Read, user)) {
      throw new ForbiddenException("You don't have enough permissions");
    }
  }
}
