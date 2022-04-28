import { IsDate, IsOptional } from 'class-validator';
import { Type } from 'class-transformer';

export class StatsTodoDto {
  @IsOptional()
  @Type(() => Date)
  @IsDate()
  start: Date;

  @IsOptional()
  @Type(() => Date)
  @IsDate()
  end: Date;
}
