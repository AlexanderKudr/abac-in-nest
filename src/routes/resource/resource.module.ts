import { Module } from '@nestjs/common';
import { ResourceController } from './resource.controller';
import { ResourceService } from './resource.service';
import { CaslModule } from 'src/factories/casl/casl-ability.module'; // <-- Add CaslModule

@Module({
  imports: [CaslModule], // <-- Add CaslModule
  controllers: [ResourceController],
  providers: [ResourceService],
})
export class ResourceModule {}
