import { ApiPropertyOptional } from '@nestjs/swagger';
import { Type, Transform } from 'class-transformer';
import { Min, IsInt, IsOptional, IsBoolean } from 'class-validator';

export class StudiesQueryDto {
  @ApiPropertyOptional({
    description: 'id filtering',
  })
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  id?: number;

  @ApiPropertyOptional({
    description: 'active filtering',
  })
  @IsBoolean()
  @Transform(({ value }) => {
    if (value === 'true') return true;
    if (value === 'false') return false;
    return value;
  })
  @IsOptional()
  active?: boolean;

  @ApiPropertyOptional({
    description: ' user id filtering',
  })
  @Min(1)
  @IsInt()
  @Type(() => Number)
  @IsOptional()
  userId?: number;
}
