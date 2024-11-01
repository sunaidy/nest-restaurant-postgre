import { ApiProperty } from '@nestjs/swagger';

export class PaginationDto {
  @ApiProperty()
  take: number;

  @ApiProperty()
  skip?: number;

  @ApiProperty()
  cursor?: number;

  page?: number;
}
