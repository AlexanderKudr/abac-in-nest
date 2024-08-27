import { ApiProperty } from '@nestjs/swagger';

export class UsersDto {
  @ApiProperty()
  id: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  role: string;
}
